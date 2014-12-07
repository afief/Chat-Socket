function init() {
    con.blue("INIT");
    
    var socket = io();
    socket.on("connect", function() {
        con.green("CONNECT");
        socketInit();
    });
    
    function socketInit() {
        
        /* Login Stuff */
        $("#loginform").submit(function(e) {
            con.l("emitting login");
            socket.emit("login", {username: $("#login_name").val(), password: $("#login_password").val()});
            
            e.preventDefault();
        });
        socket.on("login_success", function(res) {
            con.l("login success", res);
            showPage("main");
        });
        socket.on("login_fail", function(err) {
            alert(err);
        });
    }
    
    showPage("home");
    
    function showPage(id) {
        $(".page").hide();
        $("#" + id).show();
    }
}

window.addEventListener('load', init);