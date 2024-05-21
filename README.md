DOCUMENTATIOn

Prequisites
  - After cloning, create .env for environment variables. The variables are the following:

    a. PORT

    b. MONGO_URL - Url generated in your mongoDB setup

    c. JWT_SECRET - Get encryption 256 bit key online (https://acte.ltd/utils/randomkeygen, you can check here)

    d. JWT_LIFETIME - How long does jwt key last.

How to run the web app
1. npm run install 
    - Installs node modules in backend (Nodejs)
2. npm run install-client
    - Installs node modules in frontend (Reactjs)
3. npm run dev
    - Runs the webapp. Depending on your PORT in your .env, access it in http://localhost:<PORT>/
