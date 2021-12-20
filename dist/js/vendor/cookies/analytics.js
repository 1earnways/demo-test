window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
Promise.all([
    //appends the Google Tag Manager script to the page’s body element, and then loads it asynchronously.
    new Promise((resolve) => {
        var script = document.createElement('script');
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-LT6D5P3QEE";
        script.async = true;
        document.body.appendChild(script);
        //Once complete, the Promise resolves and calls the gtag method
        resolve();
    }), 
    new Promise((resolve) => {
        gtag('js', new Date());
        //registers a page view with Google Analytics
        gtag('config', 'G-LT6D5P3QEE');
        resolve();
    })
]);