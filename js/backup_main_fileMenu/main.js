var JSFILE = "",
    CSSARRAY = [],
    USERNAME = "",
    ACCOUNTID = "",
    PAGECOUNT = 1,
    PROJECTNAME = "",
    PROJECTID = "",
    PAGENAME = "",
    PROCESSDOCUMENT = $('#proccess-div'),
    currEle;

$(function () {
  // init tooltips
  $("[data-toggle='tooltip']").tooltip();
  $('#webinator-title').popover({
    html : true,
    content : '<img src="img/webinator.png"><h4>An easy to use Web IDE</h4>',
    placement : "bottom"
  });

  $('#template-page-cont').selectable({ filter: ".dropped" });
 
  setPaneHeight();

  // supposed to reset modal functionality when modal hides
  $('#modal').on('hidden.bs.modal', function(){
    $('#save-btn').prop('disabled', false);
    $('#save-btn').html('Save');
    $('#save-btn').unbind( "click" );
  });

  // dismiss popover
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $('#toolbar').find('select').prop('disabled', true);
    $('#toolbar').find('button').prop('disabled', true);
    $('#toolbar').find('input').prop('disabled', true);

    var lsUserNameAndId = localStorage.getItem('webinator-username');

    if(lsUserNameAndId){
        var tmpUserNameAndId = lsUserNameAndId.split('-')[1];
        ACCOUNTID = tmpUserNameAndId;

        USERNAME = lsUserNameAndId.split('-')[0];
        var accountBar = '<div class="btn-group">'
                        + '<button type="button" class="dropdown-toggle btn-sp" data-toggle="dropdown">'
                        + '<a><img src="img/account.png" alt="account" height="15" style="padding-right:10px;">'
                        + USERNAME + '</a>'
                        + '</button>'
                        + '<ul class="dropdown-menu" role="menu">'
                        + '<li><a href="#" data-menu="account details" onclick="handleMenu($(this))">Account Details</a></li>'
                        + '<li><a href="#" data-menu="projects" onclick="handleMenu($(this))">Projects</a></li>'
                        + '<li><a href="#" data-menu="logout" onclick="handleMenu($(this))">Logout</a></li>'
                        + '</ul>'
                        + '</div>';
        $('#account-bar').html(accountBar);
        $('#account-bar').addClass('logged-in');
        $('#file-menu').find('li').removeClass('disabled');
    }
    else{
        showLogin();

        $('#file-menu').find('li').addClass('disabled');
    }

    
    if(localStorage.getItem('PROJECTID')){
        PROJECTID = localStorage.getItem('PROJECTID');
    }
    else{
        createNewProject();
    }

    // disable elements if user not logged in
    // check local storage

});

function generateNewPage(){
    PAGECOUNT++;
    removeActiveClasses();
    // $('#pages-tabbar').find('li').removeClass('active');
    $('<li role="presentation" class="page-links active"><a href="#page-' + PAGECOUNT + '" role="tab" data-toggle="tab">Page-' + PAGECOUNT + '<span data-id="page-' + PAGECOUNT + '-wrap" class="close-x-btn" onclick="removePage($(this));">×</span></a></li>').insertBefore($('#add-tab-btn'));
    $('<div class="tab-content" id="page-' + PAGECOUNT + '-wrap">\
          <div role="tabpanel" class="tab-pane active" id="page-' + PAGECOUNT + '">\
            <div class="panel-body">\
              <div id="template-wrap-' + PAGECOUNT + '" class="template-wrap">\
                <div id="template-page-cont-' + PAGECOUNT + '" class="template-page-cont">\
                  <div id="guide-h" class="guide"></div>\
                  <div id="guide-v" class="guide"></div>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>').appendTo($('#template-pane'));

    $('.page-links').on('click', function(e){
        if(e.target.nodeName == "span"){
            // e.stopPropagation();
        }
        else{
            removeActiveClasses($(this));
        }
    });
}

function removeActiveClasses(_ele){
    $('.page-links').each(function(){
        $(this).removeClass('active');
    });
    $('#template-pane .tab-pane').each(function(){
        $(this).removeClass('active'); 
    });
    if(_ele){
        _ele.addClass("active");
        $('#' + _ele.find('span').attr('data-id') + " .tab-pane").addClass('active');
        //console.log($('#' + _ele.find('span').attr('data-id') + " .tab-pane").html());
    }
}



function removePage(_ele){
    PAGECOUNT--;
    _ele.parent().parent().remove();
    $('#' + _ele.attr('data-id')).remove();

    $('.page-links').each(function(){
        $(this).removeClass('active');
    });
    $('#template-pane .tab-pane').each(function(){
        $(this).removeClass('active'); 
    });

    $('#page-1').addClass('active');
    $('#pages-tabbar').find('li').eq(0).addClass('active');
}

function showLogin(){
    $('#modal').modal('show');
    $("#modal-title").html('Login');
    $("#modal-body").html('<form class="form-horizontal" role="form">\
                                <span id="login-fail-error" style="color:red;display:none;">Incorrect Username or Password! Please try again.</span>\
                                <div class="form-group">\
                                    <label for="login-username" class="col-sm-2 control-label">Username</label>\
                                    <div class="col-sm-10">\
                                        <input type="email" class="form-control" id="login-username" placeholder="Username">\
                                    </div>\
                                </div>\
                                <br>\
                                <div class="form-group">\
                                    <label for="login-password" class="col-sm-2 control-label">Password</label>\
                                    <div class="col-sm-10">\
                                        <input type="password" class="form-control" id="login-password" placeholder="Password">\
                                    </div>\
                                </div>\
                            </form>\
                            <div style="text-align:center;"><span style="color:red;">Dont have an account?</span><br><br>\
                            <input type="button" class="btn btn-primary" value="Create Account" onclick="showCreateAccount();"></div>');
    $("#save-btn").html("Login");
    $("#save-btn").show();
    $('#save-btn').on('click', function(){
        var username = $("#login-username").val();
        var password = $("#login-password").val();
        if (username == '' || password == '') {
          alert("Insertion Failed Some Fields are Blank....!!");
        }
        else {
          // Returns successful data submission message when the entered information is stored in database.
          $.post("login.php", {
            username: username,
            password: password
          }, function(data) {
            // showMessage("message-div", data, 5000);
            console.log(JSON.parse(data));
            data = JSON.parse(data);
            if(data != "login failed"){
                ACCOUNTID = data.accountId;
                USERNAME = data.username;
                var accountBar = '<div class="btn-group">'
                                + '<button type="button" class="dropdown-toggle btn-sp" data-toggle="dropdown">'
                                + '<a><img src="img/account.png" alt="account" height="15" style="padding-right:10px;">' 
                                + USERNAME + '</a>'
                                + '</button>'
                                + '<ul class="dropdown-menu" role="menu">'
                                + '<li><a href="#" data-menu="account details" onclick="handleMenu($(this))">Account Details</a></li>'
                                + '<li><a href="#" data-menu="projects" onclick="handleMenu($(this))">Projects</a></li>'
                                + '<li><a href="#" data-menu="logout" onclick="handleMenu($(this))">Logout</a></li>'
                                + '</ul>'
                                + '</div>';
                $('#account-bar').html(accountBar);
                $('#account-bar').addClass('logged-in');
                $('#modal').modal('hide');
                
                localStorage.setItem('webinator-username', USERNAME + "-" + ACCOUNTID);
                $('#file-menu').find('li').removeClass('disabled');
            }
            else{
                $('#login-fail-error').show();
            }
            
          });
        }
    });
}

function showCreateAccount(){
    $('#modal').modal('show');
    $("#modal-title").html('Create Account');
    $("#modal-body").html('<form class="form-horizontal" role="form">\
                                <span id="create-account-fail-error" style="color:red;display:none;"></span>\
                                <div class="form-group">\
                                    <label for="create-account-username" class="col-sm-2 control-label">Username</label>\
                                    <div class="col-sm-10">\
                                        <input type="email" class="form-control" id="create-account-username" placeholder="Enter Username">\
                                    </div>\
                                </div>\
                                <br>\
                                <div class="form-group">\
                                    <label for="create-account-email" class="col-sm-2 control-label">Email</label>\
                                    <div class="col-sm-10">\
                                        <input type="text" class="form-control" id="create-account-email" placeholder="Enter Email">\
                                    </div>\
                                </div>\
                                <br>\
                                <div class="form-group">\
                                    <label for="create-account-password" class="col-sm-2 control-label">Password</label>\
                                    <div class="col-sm-10">\
                                        <input type="password" class="form-control" id="create-account-password" placeholder="Enter Password">\
                                    </div>\
                                </div>\
                            </form>');
    $("#save-btn").html("Create Account");
    $('#save-btn').unbind('click');
    $("#save-btn").show();
    $('#save-btn').on('click', function(){
        var username = $("#create-account-username").val();
        var email = $("#create-account-email").val();
        var password = $("#create-account-password").val();
        if (username == '' || password == '' || email == '') {
          alert("Insertion Failed Some Fields are Blank....!!");
        }
        else {
          // Returns successful data submission message when the entered information is stored in database.
          $.post("createAccount.php", {
            username: username,
            password: password,
            email:email
          }, function(data) {
            // showMessage("message-div", data, 5000);
            //$('#form')[0].reset(); // To reset form fields
            //give Super User privelages
            // isSU(true);
            if(data == "no errors"){
                

                // $('#modal').modal('hide');
                showLogin();
            }
            else{
                $('#create-account-fail-error').show();
                $('#create-account-fail-error').html(data);
            }
            
          });
        }
    });
}


function setPaneHeight(){
    var newHeight =  $(window).height() - 100 + "px",
        componentHeight = $(window).height() - 130 + "px",
        tmplHeight = $(window).height() - 140 + "px";
    $('#template-page-cont').css('height', tmplHeight );
    $('#components').css('height', componentHeight);
    $('#styling').css('height', componentHeight);
    $('#bootstrap-components').css('height', componentHeight);

}

//get all css properties for a given element
function showChangeCSSModal(_ele){
    $('#modal').modal('show');
    // $("#modal-title").html('Style this ' + _ele.find(_ele.attr('data-ele-type')).prop("tagName"));
    $("#modal-title").html('Style this ' + _ele.prop("tagName"));
    $("#modal-body").html($( _ele ).css( "cssText" ));
}

// displays modal for inserting an element
function insertElement(){
    // show modal here
    $('#modal').modal('show');
    $("#modal-title").html('Insert and Element');
    $("#modal-body").html('some buttons and dropdowns will be here eventually.');
}

function showEventModal(_ele){
    $('#modal').modal('show');
    $("#modal-title").html('Add event');
    $("#modal-body").html('<div>\
                                <div id="event-type-wrap" class="btn-group btn-group-justified" data-toggle="buttons">\
                                    <label class="btn btn-default"><input type="radio" class="hidden" name="event-type" value="click">onclick</label>\
                                    <label class="btn btn-default"><input type="radio" class="hidden" name="event-type" value="change">onchange</label>\
                                    <label class="btn btn-default"><input type="radio" class="hidden" name="event-type" value="mouseover">onmouseover</label>\
                                    <label class="btn btn-default"><input type="radio" class="hidden" name="event-type" value="keydown">onkeydown</label>\
                                    <label class="btn btn-default"><input type="radio" class="hidden" name="event-type" value="load">onload</label>\
                                </div>\
                                <p style="color:red;display:none;" id="event-type-selection-error">Please select an Event Type!</p>\
                                <p style="color:red;display:none;" id="event-type-id-error">Please add ID first!</p>\
                                <p style="color:red;display:none;" id="add-event-error">Please select an Element first!</p>\
                                <div style="display:none;" class="input-group" id="id-input-div">\
                                <span class="input-group-addon">Enter An ID: </span>\
                                <input type="text" style="height:36px;" class="form-control" id="id-name-input">\
                                <span class="input-group-addon" style="padding:0px;">\
                                    <input type="button" value="Add ID" class="btn btn-default" onclick="addID($(this))">\
                                </span></div>\
                                <hr>\
                                <div>\
                                    <label style="display: block;">function<input type="text" class="form-control" id="funct-name" name="NewFunct" placeholder="Function Name ...">(){</label>\
                                    <textarea style="display: block; width: 100%;" rows="5" id="funct-content" placeholder="Some JavaScript Goes Here..."></textarea>\
                                    <span>}</span>\
                                </div>\
                            </div>');
    

    if(_ele){
        $("#modal-title").html("Add event to this " + _ele.prop("tagName"));
        if(_ele.id){
            clickBindSaveBtn();
        }
        else{
            $('#save-btn').prop('disabled', true);
            $('#id-input-div').show();
            $('#event-type-id-error').show();
        }
        
    }
    else{
        $('#add-event-error').show();
        $("#modal-title").html("Add event to : nothing selected");
        $('#save-btn').prop('disabled', true);
        $('#save-btn').on('click', function(){
            console.info('must select and element first');
        });
    }
}

function clickBindSaveBtn(){
    $('#save-btn').on('click', function(){
        if(!$('input:radio[name=event-type]:checked').val()){
            $('#event-type-selection-error').show();
        }
        else{
            attachCustomFunct();
            console.log(JSFILE);
            $('#modal').modal('hide');   
        }
    });
}

function addID(_ele) {
    if($('#id-name-input').val() != ""){
        currEle.attr('id', $('#id-name-input').val());
        $('#event-type-id-error').hide();
        $('#save-btn').prop('disabled', false);
        _ele.parent().parent().html('<span class="success">ID added successfully. Please continue building function.</span>\
                                    <p>The ID you added is "<span id="id-val">' + $('#id-name-input').val() + '</span>"</p>');
        clickBindSaveBtn();
    }
}

// display modal to add class to element
function addAClass(_ele){
    $('#modal').modal('show');
    $("#modal-title").html('Add a Class');
    $("#modal-body").html('Enter Class Name: <input type="text" id="class-name-input">\
                            <p style="color:red;display:none;" id="add-class-error">Please select an element first!</p>');
    $('#save-btn').unbind( "click" );
    if(_ele){
        $('#save-btn').on('click', function(){
            _ele.attr("id", $('#id-name-input').val());
            $('#modal').modal('hide');
        });
    }
    else{
        $('#add-class-error').show();
        $('#save-btn').prop('disabled', true);
        $('#save-btn').on('click', function(){
            console.info('must select and element first');
        });
    }
}

// display modal to add id to element
function addAnId(_ele){

    $('#modal').modal('show');
    $("#modal-title").html('Add an ID');
    $("#modal-body").html('Enter An ID: <input type="text" id="id-name-input">\
                        <p style="color:red;display:none;" id="add-id-error">Please select an element first!</p>');
    $('#save-btn').unbind( "click" );
    if(_ele){
        $('#save-btn').on('click', function(){
            _ele.attr("id", $('#id-name-input').val());
            $('#modal').modal('hide');
        });
    }
    else{
        $('#add-id-error').show();
        $('#save-btn').prop('disabled', true);
        $('#save-btn').on('click', function(){
            console.info('must select and element first');
        });
    }
}

// function to handle adding js 
function attachCustomFunct(){
    var fullFunction = "",
        eventFunction = "",
        functName = $('#funct-name').val(),
        functContent = $('#funct-content').val(),
        functParams = "",
        eventType = $('input[name=event-type]:checked').val();

    // if an event type was selected
    if(eventType){
        $('.funct-param').each(function(){
            // check if field was empty
            var val = $(this).val().trim();
            if(val != ""){
                functParams += $(this).val() + ",";
            }
        });

        // removes last comma
        functParams = functParams.replace(/,\s*$/, "");
        fullFunction = "function " + functName + "(" + functParams + "){<br>" 
                        + functContent + "<br>}<br>";
        

        eventFunction += "$('#" + $('#id-val').html() + "').on('" + eventType + "', function(){<br>" + functName + "(); <br>});";
        
        // add to global JSFILE
        JSFILE += fullFunction + "<br>" + eventFunction;

        // dismiss modal
        $('#modal').modal('hide');
    }
    else{
        console.log('please select a click event type');
        $('#event-type-selection-error').show();
    }
}

function displayAddURLModal(){
    currEle.popover('hide');
    $('#modal').modal('show');
    $("#modal-title").html('Add Image Via URL');
    $("#modal-body").html('<input type="text" class="form-control" id="img-url" placeholder="Enter URL to Image">\
                            <p style="color:red;display:none;" id="img-url-error">Please enter a URL!</p>');
    $('#save-btn').unbind( "click" );
    $('#save-btn').on('click', function(){
        if($('#img-url').val()){
            currEle.find('img').attr("src", $('#img-url').val());
            currEle.find('img').css('max-height', '400px');
            currEle.find('img').css('max-width', '400px');
            $('#modal').modal('hide');
        }
        else{
            $('#img-url-error').show();
        }
    });
}

function showEditLinkModal(){
    currEle.popover('hide');
    $('#modal').modal('show');
    $("#modal-title").html('Add Link Address');
    $("#modal-body").html('<b>Text you want the on the hyperlink:</b>\
                            <input type="text" class="form-control" id="link-text" placeholder="Text to display">\
                            <b>To what URL should this link go?</b> \
                            <input type="text" class="form-control" id="link-url" placeholder="Link Address">\
                            <input type="button" class="btn btn-default" value="Test this link" onclick="window.open($(\'#link-url\').val())">\
                            <p style="color:red;display:none;" id="link-url-error">Please enter a URL or link address!</p>');
    $('#save-btn').unbind( "click" );
    $('#save-btn').on('click', function(){
        if($('#link-url').val()){
            currEle.attr("href", $('#link-url').val());
            if($('#link-text').val()){
                currEle.html($('#link-text').val());
                $('#modal').modal('hide');
            }
            else{
                currEle.html($('#link-url').val());
                $('#modal').modal('hide');
            }
        }
        else{
            $('#link-url-error').show();
        }
    });
}

function moveForward(_ele){
    console.log(_ele.css('z-index'));
    _ele.css('z-index', (parseInt(_ele.css('z-index')) + 1));
    console.log(_ele.css('z-index'));
}

function moveBackward(_ele){
    console.log(_ele.css('z-index'));
    _ele.css('z-index', (_ele.css('z-index') - 1));
    console.log(_ele.css('z-index'));
}

// called after a new element has been dragged onto template
function postDragOutElement(_ele){
    var menu1 = [
      {'Attach an Event':function(menuItem,menu) { showEventModal(_ele); } },
      // {'Style Element':function(menuItem,menu) { showChangeCSSModal(_ele); } },
      {'Insert Element':function(menuItem,menu) { insertElement(_ele); } },
      $.contextMenu.separator,
      {'Add ID':function(menuItem,menu) { addAnId(_ele); } },
      {'Add Class':function(menuItem,menu) { addAClass(_ele); } },
      $.contextMenu.separator,
      {'Move Forward':function(menuItem,menu) { moveForward(_ele); } },
      {'Move Backward':function(menuItem,menu) { moveBackward(_ele); } },
      $.contextMenu.separator,
      {'Delete':function(menuItem,menu) { deleteElement(_ele) } },
    ];
    $(function() {
      _ele.contextMenu(menu1,{theme:'gloss'});
    });
}


function deleteElement(_currEle){
    PROCESSDOCUMENT.append(_currEle.clone());
    console.log(PROCESSDOCUMENT.html());
  $('.ui-selected').popover('destroy');
  $('.ui-selected').remove();
  
  $('.editing').popover('destroy');
  $('.editing').remove();

  _currEle.popover("destroy");
  _currEle.remove();
}

function copyElement(){
    var newEle = currEle.clone();
    newEle.prependTo('#template-page-cont');
    
    initDraggable(newEle);
}

function cutElement(){

}

function pasteElement(){

}
function undoAction(_ele){
    console.log("undo: ele: " +_ele);
    console.log(PROCESSDOCUMENT.html());
    console.log(PROCESSDOCUMENT.children().eq(0));
    var restoredEle = PROCESSDOCUMENT.children().eq(0);
    initDraggable(restoredEle);
    $('#template-page-cont').append(restoredEle);
}
function redoAction(_ele){
    console.log("undo: ele: " +_ele);
}



// handles keypresses
$(document).keyup(function(e){
    // disable deleting for now
    // if(e.keyCode == 46){
    //   deleteElement(currEle);
    // }
    if( e.which === 90 && e.ctrlKey && e.shiftKey ){
     console.log('control + shift + z'); 
     redoAction(currEle);
    }
    else if( e.which === 90 && e.ctrlKey ){
     console.log('control + z'); 
     undoAction(currEle);
    }  
});

// DOM Parser
Element.prototype.serializeWithStyles = (function () {  

    // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.
    var defaultStylesByTagName = {};

    // Styles inherited from style sheets will not be rendered for elements with these tag names
    var noStyleTags = {"BASE":true,"HEAD":true,"HTML":true,"META":true,"NOFRAME":true,"NOSCRIPT":true,"PARAM":true,"SCRIPT":true,"STYLE":true,"TITLE":true};

    // This list determines which css default values lookup tables are precomputed at load time
    // Lookup tables for other tag names will be automatically built at runtime if needed
    var tagNames = ["A","ABBR","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BASE","BDI","BDO","BLOCKQUOTE","BODY","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATALIST","DD","DEL","DETAILS","DFN","DIV","DL","DT","EM","EMBED","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEAD","HEADER","HGROUP","HR","HTML","I","IFRAME","IMG","INPUT","INS","KBD","KEYGEN","LABEL","LEGEND","LI","LINK","MAP","MARK","MATH","MENU","META","METER","NAV","NOBR","NOSCRIPT","OBJECT","OL","OPTION","OPTGROUP","OUTPUT","P","PARAM","PRE","PROGRESS","Q","RP","RT","RUBY","S","SAMP","SCRIPT","SECTION","SELECT","SMALL","SOURCE","SPAN","STRONG","STYLE","SUB","SUMMARY","SUP","SVG","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TITLE","TR","TRACK","U","UL","VAR","VIDEO","WBR"];

    // Precompute the lookup tables.
    for (var i = 0; i < tagNames.length; i++) {
        if(!noStyleTags[tagNames[i]]) {
            defaultStylesByTagName[tagNames[i]] = computeDefaultStyleByTagName(tagNames[i]);
        }
    }

    function computeDefaultStyleByTagName(tagName) {
        var defaultStyle = {};
        var element = document.body.appendChild(document.createElement(tagName));
        var computedStyle = getComputedStyle(element);
        for (var i = 0; i < computedStyle.length; i++) {
            defaultStyle[computedStyle[i]] = computedStyle[computedStyle[i]];
        }
        document.body.removeChild(element); 
        return defaultStyle;
    }

    function getDefaultStyleByTagName(tagName) {
        tagName = tagName.toUpperCase();
        if (!defaultStylesByTagName[tagName]) {
            defaultStylesByTagName[tagName] = computeDefaultStyleByTagName(tagName);
        }
        return defaultStylesByTagName[tagName];
    }

    return function serializeWithStyles() {
        if (this.nodeType !== Node.ELEMENT_NODE) { throw new TypeError(); }
        var cssTexts = [];
        var elements = this.querySelectorAll("*");
        for ( var i = 0; i < elements.length; i++ ) {
            var e = elements[i];
            if (!noStyleTags[e.tagName]) {
                var computedStyle = getComputedStyle(e);
                var defaultStyle = getDefaultStyleByTagName(e.tagName);
                cssTexts[i] = e.style.cssText;
                for (var ii = 0; ii < computedStyle.length; ii++) {
                    var cssPropName = computedStyle[ii];
                    if (computedStyle[cssPropName] !== defaultStyle[cssPropName]) {
                        e.style[cssPropName] = computedStyle[cssPropName];
                    }
                }
            }
        }
        var result = this.outerHTML;
        for ( var i = 0; i < elements.length; i++ ) {
            elements[i].style.cssText = cssTexts[i];
        }
        return result;
    }
})();




// function to handle preview

