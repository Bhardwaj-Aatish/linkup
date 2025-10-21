<!-- the cleanup steps -->
clean all the file under public
Under styles, only use globals.css
Under src, create app, components and lib


app -> pages like dashboard, login, register, 
    -> home page, page.tsx and layout.tsx for baseurl

components -> created components like authform.tsx and navbar.tsx
plan to change the authform component into a formcomponent, so can be used for generic 


lib -> created axiosInstance.ts, to configure axios, so that don't need to put baseurl and token again


created .env.local file under client
    -> can access any variable in this file with NEXT_PUBLIC_ prefix in our website
    -> NEXT_PUBLIC_BASEURL = 'http://localhost:3001'
    -> process.env.NEXT_PUBLIC_BASEURL

For api call under register, and login, page, if we don't provide the base url, it assumes the same on which we are serving the nextjs application


router, redirect from next/navigation
can pass a callback function to the parent from child, to perform a specific action
app/layout.tsx is for all pages


<!-- as of now-->
I have working home page, which will redirect to login if you don't have token
if you have the token, it takes you the dashboard page
On the signin page, you have option to go back to the signup page to create new account
After creating the account, it will automatically redirect to the login page
After login successfully, it will direct us to dashboard page. 


