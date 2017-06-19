# Cayenne Cloud API Sample App

This repo contains a sample app walking through the Authentication process along with device pre-provisioning. 

---

## Prereqs
1. Run `npm install` in root
2. This app was built using React Native and a getting start guide can be found [here.](https://facebook.github.io/react-native/docs/getting-started.html)
    - Use your preferred React Native (I used [Visual Studio Code](https://code.visualstudio.com/) with React Native Tools plugin)
3. Create or log into your Cayenne account at https://cayenne.mydevices.com/cayenne/login
4. Obtain  your Cayenne Cloud API app key and secret by clicking the Create App button.
5. Create an `.env` file using the `.env.example` file and input your app key/secret values
6. You should now be able to run the Sample App and land on the login screen (implicit/explicit logins will not work at this point)

## Updating Your Application
1. Get your token by making a POST call to `https://auth.mydevices.com/oauth/token` with the following data:  
```
{
    "grant_type": "password",
    "email": "YOUR CAYENNE EMAIL",
    "password": "YOUR CAYENNE PASSWORD"
}
```
Example curl call:
```
curl -X POST -H 'Content-Type: application/json' 'https://auth.mydevices.com/oauth/token' -d '{"grant_type":"password","email":"EMAIL","password":"PASSWORD"}'
```
Successful response will respond with the following:
```
{
    "access_token": "YOUR ACCESS TOKEN",
    "refresh_token": "YOUR REFRESH TOKEN"
}
```
2. Using the access token from step 1, you can now view your application.
Example GET application call
```
curl -X GET -H 'Authorization: Bearer ACCESS_TOKEN' 'https://auth.mydevices.com/applications'
```
Successful response will respond with the following:
```
{
    "id": "YOUR APP ID",
    "name": "Beta App",
    "description": "This is a beta app created with Cayenne API",
    "secret": "YOUR APP SECRET",
    "status": "active",
    "created_at": "",
    "updated_at": ""
}
```
*Note: name and description currently have default values during Beta release

3. Update your application's redirect_uri as the sample app will use this to deep link
Example POST application call
```
curl -X POST -H 'Authorization: Bearer ACCESS_TOKEN' 'https://auth.mydevices.com/applications/{app id}/redirects' -d '{"redirect_uri": "tankmonitor://implicit"}'
```
Successful response:
```
{
    "id": "YOUR REDIRECT ID",
    "app_id": "YOUR APP ID",
    "redirect_uri": "tankmonitor://implicit",
    "updated_at": "YYYY-MM-DDTHH:MM:SS.mmmZ",
    "created_at": "YYYY-MM-DDTHH:MM:SS.mmmZ"
}
```
Repeat this step for `tankmonitor://explicit` and any other redirect URIs your application will need.

You can also add `http://example.com/redirect` as an additional redirect URI to get your oAuth2 token using the following link:
```
https://auth.mydevices.com/oauth/authorization?redirect_uri=https%3A%2F%2Fexample.com%2Fredirect&client_id=YOUR APP ID&response_type=token&state=0123456789
```
You will be taken to a login page and after a successful login, you'll be redirect to `http://example.com/redirect#access_token=YOUR ACCESS TOKEN&state=0123456789`

You can then use this access token to add things under your application. 

4. With all the proper redirect links, you are now able to log into the sample app using either Explicit or Implicit login and you will be redirected to the sample app via deep linking after a successful login.
    - Note: Logging in using the email/password combo on the login screen will give you a token and allow you to view all your devices under your Cayenne account. Using the oAuth2 token will allow you to only view all the devices under your application account.

## Preprovisioning
The sample app goes over pairing a Gateway and Sensor to a user's account but before doing so, the device must be pre-provisioned. 

**The following steps will be using the oAuth2 token retrieved from Step 3 on Updating Your Application.**

1. A device type must first be add issuing a POST to `https://platform.mydevices.com/things/types` with the following gateway example payload:
```
{
    "name": "My Gateway",
    "description": "A sample gateway",
    "version": "v1.0",
    "manufacturer": "Example Inc.",
    "parent_constraint": "NOT_ALLOWED",
    "child_constraint": "ALLOWED",
    "category": "module",
    "subcategory": "lora",
    "transport_protocol": "mqtt"
}
```

And with an example sensor gateway payload:
```
{
    "name": "My Sensor",
    "description": "A sample sensor",
    "version": "v1.0",
    "manufacturer": "Example Inc.",
    "parent_constraint": "ALLOWED",
    "child_constraint": "ALLOWED",
    "category": "sensor",
    "subcategory": "lora",
    "transport_protocol": "mqtt"
}
```

Upon a successful request, you will receive a payload response with an "id" value, this will be your device type id. 

2. Pre-provisioning your device is can be done in several methods by issuing a POST to `https://platform.mydevices.com/` on the following enpoints: `things/registry`, `things/registry/batch`, or `things/registry/csv`.
- `things/registry` payload: 
```
{
{
  "hardware_id": "YOUR UNIQUE HARDWARE ID",
  "application_id": "YOUR APP ID",
  "device_type_id": "YOUR DEVICE TYPE ID (Step 1)",
  "response_csv": false
}
}
```

- `/things/registry/batch` payload:
```
{
  "device_type_id": "YOUR DEVICE TYPE ID (Step 1)",
  "hardware_ids": [
    "YOUR UNIQUE HARDWARE IDs"
  ],
  "count": 0,
  "response_csv": false
}
```

*Repeat the POST calls to `/things/registry` for all your device type ids. 

3. With all your hardware IDs entered, you are now able to launch the app and go through the Gateway pairing process along with sensors. 
