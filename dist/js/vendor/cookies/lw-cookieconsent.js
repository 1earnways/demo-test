//https://github.com/orestbida/cookieconsent
window.addEventListener('load', function(){
		
    var cookieconsent = initCookieConsent();

    cookieconsent.run({
        current_lang : 'sv',
        theme_css : 'js/vendor/cookies/cookieconsent.css',
        cookie_name: 'cookieAccepted',
        // "autoclear_cookies"= Enable if you want to automatically delete cookies when user opts-out of a specific category inside cookie settings
        autoclear_cookies: 'true',
        // "autorun" = show the cookie consent as soon as possible
        autorun: 'true',
        onAccept: function(){				
            // ... cookieconsent accepted
            if (cookieconsent.allowedCategory("analytics")) {
                //console.log('cookies accepted');
                //Load Analytics code
                cookieconsent.loadScript('js/vendor/cookies/gtm.js', function(){
                    // script loaded ...
                    //console.log('analytics cookies loaded');
                });
            }
        },

        languages : {
            sv : {
                //consent_modal är den lilla rutan i början
                consent_modal : {
                    title :  "Vi värnar om din integritet",
                    description :  'Vi använder cookies för att undersöka hur vår hemsida används och ge våra besökare bästa möjliga upplevelse',
                    primary_btn: {
                        text: 'Godkänn',
                        role: 'accept_all'  //'accept_selected' or 'accept_all'
                    },
                    secondary_btn: {
                        text : 'Inställningar',
                        role : 'settings'   //'settings' or 'accept_necessary'
                    }
                },
                //settings_modal är den andra modalen med inställningar
                settings_modal : {
                    title : 'Inställningar',
                    save_settings_btn : "Spara",
                    accept_all_btn : "Godkänn alla cookies",
                    reject_all_btn : "Avböj alla cookies", // optional, [v.2.5.0 +]
                    close_btn_label: "Stäng",  
                    cookie_table_headers : [ //sätter columner och rubriker
                        {col1: "Cookie" }, 
                        {col2: "Syfte" }, 
                        {col3: "Längd" }
                    ], 
                    blocks : [
                        { //första delen i modalen med bara info
                            title : "Cookies",
                            description: 'Vissa cookies är nödvändiga för webbplatsens funktionalitet, andra hjälper oss att förbättra din upplevelse genom att ge insikt i hur webbplatsen används.'
                        },{ //kategori för nödvändiga cookies, är som default readonly eftersom man inte ska kunna stänga av dessa.
                            title : "Nödvändiga cookies",
                            description: 'Dessa cookies är nödvändiga för webbplatsens funktionalitet och kan inte inaktiveras.',
                            toggle : {
                                value : 'necessary',
                                enabled : true, //default is enabled
                                readonly: true //cookie categories with readonly=true are all treated as "necessary cookies"
                            },
                            cookie_table: [ //fyll på med fler rader om det behövs, refererar till cookie_table_headers
                            {
                                col1: 'cookieAccepted',
                                col2: 'Sparar vilka cookies du valt att acceptera så vi kan anpassa innehållet efter det',
                                col3: '1 år'
                            }
                        ]

                        },{ //delen med cookies från google analytics
                            title : "Analytics cookies",
                            description: 'Vi använder Analytics-cookies för att samla information och ge oss inblick i hur besökare använder vår webbplats. Vi anonymiserar IP-adresser i Google Analytics.',
                            toggle : { //dessa är varken enabled eller readonly eftersom användaren ska kunna ändra
                                value : 'analytics',
                                enabled : false,
                                readonly: false
                            },
                            cookie_table: [
                            // is_regex - cookies kan ha mer till namnet än bara ex "_ga"
                            // och om man inte vet vad det är kan man använda is_regex=true
                            // samt ^ före namnet. Då kommer den att söka efter cookies som börjar
                            // på ex "_ga"
                            {
                                col1: '^_ga',
                                col2: 'Används av Google för att kunna särskilja användare',
                                col3: '2 år',
                                is_regex: true
                            },
                            {
                                col1: '^_gid',
                                col2: 'Används av Google för att kunna särskilja användare',
                                col3: '24 timmar',
                                is_regex: true
                            },
                            {
                                col1: '^_ga_FYKXVMC7WF',
                                col2: 'Används för att bibehålla sessionen.',
                                col3: '2 år',
                                is_regex: true
                            }
                        ]
                        },
                    ]
                }
            }
        }
    });
});
