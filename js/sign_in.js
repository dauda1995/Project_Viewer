$(document).ready(function(){

    let arr = []
    function userInfo(email, password){
        this.email = email
        this.password = password
    }

    function find_email(str, pwstr){
        let status = true;
        for(let i = 0; i<arr.length; i++){
            if((arr[i].emailt == str) && (arr[i].passwordt == pwstr)){
                status = true;
                break
            }else{

                status = false;
            }
        }
        return status;

    }

    $('#login').click(function(){
        var usernameId = $('#username').val();
        var passwordId = $('#password').val();

        var user = new userInfo(usernameId, passwordId)
        let emailstr = user.email
        let passStr = user.password

        if((passwordId !== '')&&(usernameId.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))){

            $.get( 'http://localhost:3000/users', function(data){
                $.each(data, function(i, single){
                    arr.push({
                        emailt: single.email,
                        idt: single.id,
                        passwordt: single.pass
                    })

                })
                if(find_email(emailstr, passStr)==true){
                    localStorage.setItem('idobj', emailstr)

                    swal('Login successful')
                    arr = []
                    arr2 = []
                    window.location = ''
                }else{
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Wrong Username or Password!',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                    arr = []
                }
            })
        }else{
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Wrong Username or Password!',
                footer: '<a href>Why do I have this issue?</a>'
              })
        }
    })

})