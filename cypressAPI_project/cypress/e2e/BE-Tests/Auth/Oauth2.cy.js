function GetAuthToken(){   
    return cy.request( 'POST', '/oauth/token', {
        grant_type: "password",
        username: "super.admin@iwcommerce.com",
        password: "admin",
        client_id: "2",
        client_secret: "gHQtrBdcu3B4ewpRtX81KxvwDzlKEB5HMV3KHXuJ", 
        audience : "IWAPI/iwcuat",
        scope : ""
    }).then(response =>{  
            return response.body.access_token  
        });
}

describe ('Oath access token', () =>{

    let access_token = '';

    before(()=>{ 
        GetAuthToken().then(token=>{    
            access_token = token;
        });
    });
    it('Generate access token', () => {      
        expect(access_token).to.not.be.empty;        
     }); 

     module.exports = {       
        GetAuthToken
     };

});

