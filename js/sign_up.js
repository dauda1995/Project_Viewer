$(document.ready(function(){

    let arr = [];
    function UserInfo(email, password){
        this.email = email;
        this.password = password;
    }

    function verify(str){
        let status = true;
        for(let i = 0; i<arr.length; i++){
            if(arr[i].emailtxt ==str){
                status = false;
                break;
            }else{
                status = true;
            }
        }
        return status;
    }

    $('#sign_up').click(function(){
        var usernameId= $('#username').val();
        var passwordId = $('#password').val();
        var password2Id = $('#password2').val();

        var user = new UserInfo(usernameId, passwordId)
        let emailstr = user.email;
        let passStr = user.password;


        if((passwordId === password2Id)&&(usernameId.match(/^[^\s@]+@[^\s@\.[^\s@]+$/))){

            $.get( 'http://localhost:3000/users', function(data){
                $.each(data, function(i, single){
                    arr.push({
                        emailt: single.email,
                        idt: single.id,
                        passwordt: single.pass

                    })

                })
                if(verify(emailstr)==true){
                    localStorage.setItem('idObj', emailstr)
                    $.post('http://localhost:3000/users',user);

                    swal('Login successful')
                    arr = []
                    arr2 = []
                    window.location = ''
                }else{
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'User already exists',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                    arr = []
                }
                
            })

        }else{
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Incorrect Username or Password!',
                footer: '<a href>Why do I have this issue?</a>'
              })
        }
    })


}))