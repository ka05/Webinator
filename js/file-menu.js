// JS for File Menu 

function handleMenu(_menuTitle){
  //var menu = _menuTitle.attr('data-menu');
  var menu = _menuTitle;

  resetModal();
  switch(menu){
    case "about":
      $('#modal').modal('show');
      $("#modal-title").html('About Webinator');
      $("#modal-body").html('<div style="text-align:center;">\
                              <a href="http://nova.it.rit.edu/~erw1825/DUEx/SuperUser/index.php"><img src="img/webinator.png"></a>\
                              <h4>An easy to use WYSIWYG Web IDE</h4>\
                              <h3>Developed by: Clay Herendeen</h3>\
                              <h3>Project Members / Collaborators</h3>\
                                <h4>Christopher Caulfield</h4>\
                                <h4>Noah Peterham</h4>\
                                <h4>Tek Napal</h4>\
                                <h4>Ed Willie</h4>\
                              </div>');
      $("#save-btn").hide();
      break;
    case "version":
      $('#modal').modal('show');
      $("#modal-title").html('Webinator Version 3.5 Beta');
      $("#modal-body").html('This is a beta version.');
      $("#save-btn").hide();
      break;
    case "how to":
      $('#modal').modal('show');
      $("#modal-title").html('How to...');
      $("#modal-body").html('<h2>This is a Help section</h2><p>will have to add documentation here later</p>');
      $("#save-btn").hide();
      break;
    case "save as":
      savePageAs();
      break;
    case "save this page":
      $('#modal').modal('show');
      $("#modal-title").html('Confirm Save');

      if(PAGE.PAGEID){
        $("#modal-body").html('Are you sure you want to save page: ' + PAGE.PAGENAME + '?');
        $("#save-btn").show();
        $("#save-btn").html("Yes");
        $('#save-btn').on('click', function(){
          //write current doc to local storage
          //use special key to store with (filename chosen by user and date)
          savePage(PAGE.PAGEID);

          //saveTextAsFile('index.html');
          $('#modal').modal('hide');
        });
      }
      else{
        $("#modal-body").html('<div class="form-group">\
                                <label for="project-name" class="col-sm-4 control-label">Page Name</label>\
                                <div class="col-sm-6">\
                                  <input type="text" class="form-control" id="newPageInput" name="page-name" placeholder="Page Name">\
                                </div>\
                              </div>');
        $("#save-btn").show();
        $("#save-btn").html("Save");
        $('#save-btn').on('click', function(){
          //write current doc to local storage
          //use special key to store with (filename chosen by user and date)
          saveNewPage($('#newPageInput').val());

          //saveTextAsFile('index.html');
          $('#modal').modal('hide');
        });
      }
      
      break;
    case "create new project":
      showCreateNewProject();
      break;
    case "create new page":
      createNewPage();
      break;
    case "open":
      openPage();
      break;
    case "open from server":
      $('#modal').modal('show');
      $("#modal-title").html('Open from server');
      $("#modal-body").html('Development in progress...');
      
      $('#save-btn').html('Open');
      $('#save-btn').on('click', function(){
        $('#modal').modal('hide');
      });
      break;
    case "close":
      if (confirm("Close Window?")) {
        window.close();
      }
      break;
    case "account details":
      showAccountDetails();
      break;
    case "projects":
      showProjects();
      break;
    case "logout":
      logout();
      break;
    case "Edit Radio":
      //edit radio func
      editRadioBtns();
      break;
    case "Edit Checkbox":
      //edit checkbox func
      editCheckBoxes();
      break;
  }
}


function logout(){
  localStorage.removeItem('webinator-username');
  $('#account-bar').html('<button type="button" class="btn-sp" onclick="showLogin();">\
                                <a>Login</a>\
                              </button>');
  $('#account-bar').removeClass('logged-in');
  $('#file-menu').find('li').addClass('disabled');
  localStorage.removeItem('webinator-project');
  $('#project-name-title').html("Blank Project");
  $('.page-links').each(function () {
    $(this).remove();
  });

  $('#template-page-cont').html('<h1 style="text-align:center;color: #980000;">You are not logged in!</h1>\
                                    <h3 style="text-align:center;">Please Login or Create an account</h3>');
}

function resetModal(){
  if(currEle){
    currEle.popover('hide');
  }

  $('#save-btn').prop('disabled', false);
  $('#save-btn').html('Save');
  $("#save-btn").show();
  $('#save-btn').unbind( "click" );
  $("#modal-body").html('');
  $("#modal-title").html('');
  $('#delete-btn').hide();
}

function savePageAs(){
  $('#modal').modal('show');
  $("#modal-title").html('Save as');
  $("#modal-body").html('<h4>Filename:</h4><input id="inputFileNameToSaveAs">');
  $("#save-btn").show();
  $("#save-btn").html("Save");
  $('#save-btn').on('click', function(){
    saveTextAsFile($('#inputFileNameToSaveAs').val());
    $('#modal').modal('hide');
  });
}

function loadFileAsText(){
  var fileToLoad = document.getElementById("fileToLoad").files[0];

  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) 
  {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    // document.getElementById("contentInput").value = textFromFileLoaded;
    // do stuff with file 
    // call init
  };
  fileReader.readAsText(fileToLoad, "UTF-8");
}

function saveTextAsFile(_fileName){
  // update data in html panel
  updatePanels(currEle);
  var textToWrite = '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
                    + '\n<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>'
                    + '\n<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>'
                    + '\n<link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">'
                    + '\n</head>\n<body>\n' + currentDoc 
                    + '\n<script type="text/javascript">\n' + PAGE.PAGEJS.replace(/<(?:.|\n)*?>/gm, '') + '\n</script>\n</body>\n</html>';
  var textFileAsBlob = new Blob([textToWrite], {type:'text/html'});
  // var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

  var downloadLink = document.createElement("a");
  downloadLink.download = _fileName;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null)
  {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else
  {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

function showAccountDetails(){
  $('#modal').modal('show');
  $("#modal-title").html('Account Details');

  showMessage('Loading account details, please be patient!', 'thumb', 'loading.gif');
  $.post("getAccount.php", {
    accountId: ACCOUNT.ACCOUNTID
  }, function(data) {
    // showMessage("message-div", data, 5000);
    console.log(JSON.parse(data));
    data = JSON.parse(data);

    ACCOUNT.ACCOUNTID = data[0].accountId;
    ACCOUNT.USERNAME = data[0].username;
    ACCOUNT.EMAIL = data[0].email;
    $("#modal-body").html('<h3>Username: ' + ACCOUNT.USERNAME + '</h3>'
    + '<h3>Email: ' + ACCOUNT.EMAIL + '</h3>');
    hideMessage();
  });

  $("#save-btn").hide();
}

function createNewPage(_callback){
  resetModal();
  $('#modal').modal('show');
  $("#modal-title").html('Create New Page');
  $("#modal-body").html('<form class="form-horizontal" role="form">'
                        + '<p id="create-page-fail-error" style="color:red;display:none;">There was an error creating your page, please try again!</p>'
                        + '<div class="form-group">'
                        +      '<label for="project-name" class="col-sm-4 control-label">Page Name</label>'
                        +      '<div class="col-sm-6">'
                        +          '<input type="text" class="form-control" id="newPageInput" name="page-name" placeholder="Page Name">'
                        +      '</div>'
                        +  '</div>'
                        + '</form>');
  $('#save-btn').html('Create');
  $('#save-btn').unbind( "click" );
  $('#save-btn').on('click', function(){
    if ($('#newPageInput').val() == '') {
      alert("Please enter a page name!!");
    }
    else {
      // Returns successful data submission message when the entered information is stored in database.

      showMessage('Creating page, please be patient!', 'thumb', 'loading.gif');

      $.post("createPage.php", {
        pageName: $('#newPageInput').val(),
        projectName: PROJECT.PROJECTNAME,
        accountId: ACCOUNT.ACCOUNTID
      }, function(data) { 
        if(data != "Already exists!"){
          // showMessage("message-div", data, 5000);
          console.log(JSON.parse(data));
          data = JSON.parse(data);
          if(data.msg == "Page Created Sucessfully"){
            var pageNameMsg = "Page: " + data.pageName + " Sucessfully Created";
            alert(pageNameMsg); //change to showmessage later
            PAGE.PAGENAME = data.pageName;
            PAGE.PAGEID = data.pageId;
            
            if(_callback){
              _callback();
            }

            $('#modal').modal('hide');
          }
          else{
              $('#create-page-fail-error').show();
          }
        }
        else{
          alert("Page with name: " + $('#newPageInput').val() + " already exists");
        }
        hideMessage();
      });
    }
  });
}

function showCreateNewProject(){

  $("#modal-title").html('Create New Project');
  $("#modal-body").html('<form class="form-horizontal" role="form">'
                        + '<p id="create-project-fail-error" style="color:red;display:none;">There was an error creating your project, please try again!</p>'
                        + '<div class="form-group">'
                        +      '<label for="project-name" class="col-sm-4 control-label">Project Name</label>'
                        +      '<div class="col-sm-6">'
                        +          '<input type="text" class="form-control" id="newProject" name="project-name" placeholder="Project Name">'
                        +      '</div>'
                        +  '</div>'
                        + '</form>');
  $('#modal').modal('show');
  $('#save-btn').show();
  $('#save-btn').html('Create');
  $('#save-btn').unbind( "click" );
  $('#save-btn').on('click', function(){
    createNewProject($('#newProject').val());

  });
}

function createNewProject(_projectName){
  if (_projectName == '') {
    alert("Please enter a project name!!");
  }
  else {
    // Returns successful data submission message when the entered information is stored in database.
    showMessage('Creating project, please be patient!', 'thumb', 'loading.gif');
    $.post("createProject.php", {
      projectName: _projectName,
      accountId: ACCOUNT.ACCOUNTID
    }, function(data) {
      // showMessage("message-div", data, 5000);
      console.log(JSON.parse(data));
      data = JSON.parse(data);
      if(data.msg == "Project Created Sucessfully"){
        var projectNameMsg = "Project: " + data.projectName + " Sucessfully Created";
        alert(projectNameMsg); //change to showmessage later
        // sets active/open project name and id
        getProject(data.projectId, data.projectName);

        $('#modal').modal('hide');
      }
      else{
        $('#create-project-fail-error').show();
      }
      hideMessage();
    });
  }
}

function getPage(_pageId){
  showMessage('Loading your page, please be patient!', 'thumb', 'loading.gif');
  $.post("getPage.php", {
    projectId: PROJECT.PROJECTID,
    pageId: _pageId
  }, function(data) {
    console.log(JSON.parse(data));
    var data = JSON.parse(data);
    PAGE.PAGENAME = data[0].pageName;
    PAGE.PAGEID = data[0].pageId;

    var decodedJS = $("<div/>").html(data[0].pageJS).text();
    PAGE.PAGEJS = decodedJS;

    $('#code-editor-content-js').html(PAGE.PAGEJS);

    var decoded = $("<div/>").html(data[0].pageContent).text();
    PAGE.PAGECONTENT = decoded;
    //load page into main div
    $('#template-page-cont').html(PAGE.PAGECONTENT);
    $('.dropped').each(function(){
      initDraggable($(this));
    });

    hideMessage();
  });
}

function getProject(_projectId, _projectName){
  PROJECT.PROJECTID = _projectId;
  PROJECT.PROJECTNAME = _projectName;
  localStorage.setItem('webinator-project', JSON.stringify(PROJECT));
  $('.page-links').each(function(){ $(this).remove(); });
  $('#project-name-title').html(PROJECT.PROJECTNAME);
  $('#template-page-cont').html('<h1 style="text-align:center;color: #980000;">Project:' + PROJECT.PROJECTNAME + ' Has No Pages Yet.</h1>\
                                    <h3 style="text-align:center;">To create one click <b>File - > Create New Page</h3>');
}

function openPage(){
  resetModal();
  $("#modal-title").html('Open file');
  var pagesArr, fileList;

  showMessage('Loading pages, please be patient!', 'thumb', 'loading.gif');
  $.post("getPages.php", {
    projectId: PROJECT.PROJECTID
  }, function(data) {
    if(data != ""){
      console.log(JSON.parse(data));
      data = JSON.parse(data);
      pagesArr = data;

      fileList = '<div id="page-listing" class="btn-group btn-group-justified" data-toggle="buttons">'; 
      for(var i = 0; i < pagesArr.length; i++){
          fileList += '<label class="btn btn-default"><input type="radio" class="hidden" name="page-to-load" value="' + pagesArr[i].pageId + '" data-page-id="' + pagesArr[i].pageId + '">' + pagesArr[i].pageName + '</label>';
      }

      fileList += '</div>';
      $("#modal-body").html('<h4>Select a File to Load:</h4>\
                            <p style="color:red;display:none;" id="page-to-load-selection-error">Please select an Page to Load!</p>\
                            <input type="file" id="fileToLoad" style="border:none; border-color: none; box-shadow: none; outline: none;">\
                            <br> OR Chose File from server <br><br>' + fileList );
    }
    else{ // no files on server
      $("#modal-body").html('<h4>Select a File to Load:</h4>\
                          <p style="color:red;">\
                          <input type="file" id="fileToLoad" style="border:none; border-color: none; box-shadow: none; outline: none;">\
                          <br> OR Chose File from server <br><br>\
                          You Currently have no pages in project:' + PROJECT.PROJECTNAME + '</p>\
                          <p>To create one click <b>File - > Create New Page</p>');
    }

    hideMessage();
  })
  .fail(function(error) { // if call fails
    console.log(error.responseJSON);
    $("#modal-body").html('<h4>Select a File to Load:</h4>\
                          <p style="color:red;">\
                          You Currently have no pages in project:' + PROJECT.PROJECTNAME + '</p>\
                          <p>To create one click <b>File - > Create New Page</p>');
  });

  $('#modal').modal('show');
  $('#save-btn').html('Open');
  $('#save-btn').on('click', function(){
    
    if(!$('input:radio[name=page-to-load]:checked').val()){
        $('#page-to-load-selection-error').show();
    }
    else{
        getPage($('input[name=page-to-load]:checked').val());
        $('#modal').modal('hide');   
    }
    //loadFileAsText();
    $('#modal').modal('hide');
  });
}

function parsePagePreSave(){
  $('#template-page-cont .dropped').each(function(){
    $(this).resizable("destroy");
    $(this).popover("hide");
  });
}

function parsePagePostSave(){
  $('#template-page-cont .dropped').each(function(){
    $(this).resizable({
      handles:"all"
    });
  });
}

function savePage(){
  showMessage('Saving your page, please be patient!', 'thumb', 'loading.gif');
  parsePagePreSave();

  $.post("savePage.php", {
    pageId:PAGE.PAGEID,
    pageContent: $('#template-page-cont').html(),
    pageJS: PAGE.PAGEJS
  }, function(data) { 
    if(data != "Already exists!"){
      // showMessage("message-div", data, 5000);
      console.log(JSON.parse(data));
      data = JSON.parse(data);
      if(data.msg == "Page Saved Sucessfully"){
        var pageNameMsg = "Page: " + PAGE.PAGENAME + " Sucessfully Saved";
        alert(pageNameMsg); //change to showmessage later

        parsePagePostSave();
        $('#modal').modal('hide');
      }
      // else{
      //   $('#save-page-fail-error').show();
      // }
      hideMessage();
    }
    else{
      alert("Page with name: " + $('#newPageInput').val() + " already exists");
    }
  });
}

function saveNewPage(){

}

// getFirstPage - gets first page available if one is avaliable
function getFirstPage(_callback){
  showMessage('Loading your project, please be patient!', 'thumb', 'loading.gif');
  $.post("getPages.php", {
    projectId: PROJECT.PROJECTID
  }, function(data) { 
    // showMessage("message-div", data, 5000);
    // console.log(data);
    if(data != ""){
      console.log(JSON.parse(data));
      var pagesArr = JSON.parse(data);

      for(var i = 0; i < pagesArr.length; i++){
        addPageCallBack(pagesArr[i].pageId, pagesArr[i].pageName);

        var tmpArr = {
          pageId:pagesArr[i].pageId,
          pageContent:pagesArr[i].pageContent,
          pageJS:pagesArr[i].pageJS,
          pageName:pagesArr[i].pageName
        };
        PAGES.push(new Page(tmpArr));
      }

      PAGE.PAGENAME = pagesArr[0].pageName;
      PAGE.PAGEID = pagesArr[0].pageId;

      var decodedJS = $("<div/>").html(data[0].pageJS).text();
      PAGE.PAGEJS = decodedJS;

      $('#code-editor-content-js').html(PAGE.PAGEJS);

      var decoded = $("<div/>").html(pagesArr[0].pageContent).text();
      PAGE.PAGECONTENT = decoded;
      $('#pagelink-' + PAGE.PAGEID).addClass('active');
      $("#page-" + PAGE.PAGEID).addClass('active');
      $('#template-page-cont').html(PAGE.PAGECONTENT);
      currEle = $('#template-page-cont .dropped').eq(0);
      $('.dropped').each(function(){
        initDraggable($(this));
      });


      if(_callback){
        _callback();
      }

    }
    else{
      $('#template-page-cont').html('<h1 style="text-align:center;color: #980000;">Project:' + PROJECT.PROJECTNAME + ' Has No Pages Yet.</h1>\
                                  <h3 style="text-align:center;">To create one click <b>File - > Create New Page</h3>');
    }
    hideMessage();
  })
  .fail(function(error) { 
    console.log(error.responseJSON);
    $('#template-page-cont').html('<h1 style="text-align:center;color: #980000;">Project:' + PROJECT.PROJECTNAME + ' Has No Pages Yet.</h1>\
                                    <h3 style="text-align:center;">To create one click <b>File - > Create New Page</h3>');
  });
}

function showProjects(){
  showMessage('Loading your projects, please be patient!', 'thumb', 'loading.gif');

  $("#modal-title").html('Projects');
  $.post("getProjects.php", {
    accountId: ACCOUNT.ACCOUNTID
  }, function(data) {
    // showMessage("message-div", data, 5000);
    if(data != ""){
      console.log(JSON.parse(data));
      var projectArr = JSON.parse(data);

      var projectList = '<div id="project-listing" class="btn-group btn-group-justified" data-toggle="buttons">';
      for(var i = 0; i < projectArr.length; i++){
        projectList += '<label class="btn btn-default"><input type="radio" class="hidden" name="project-to-load" value="' + projectArr[i].projectId + '" data-project-id="' + projectArr[i].projectId + '" data-project-name="' + projectArr[i].projectName + '">' + projectArr[i].projectName + '</label>';
      }

      projectList += '</div>';
      $("#modal-body").html('<h4 id="select-proj-txt">Select a Project to Open:</h4>' + projectList
                            + '<br/><h4>Create new Project</h4>'
                            + '<div class="form-group">'
                            +   '<label for="project-name" class="col-sm-3 control-label">Project Name</label>'
                            +   '<div class="col-sm-4"><input type="text" class="form-control" id="newProject" name="project-name" placeholder="Project Name"></div>'
                            + '<div class="col-sm-3"><button type="button" class="btn btn-primary" onclick="createNewProject($(\'#newProject\').val())">Create</button></div>'
                            + '<br></div>');
    }
    else{
      $("#modal-body").html('<h4>Select a Project to</h4>\
                                <p style="color:red;">\
                                You Currently have no projects</p>\
                                <p>To create one click <b>File - > Create New Project</p>');
      $('#delete-btn').prop("disabled", "disabled");
    }
    hideMessage();
  })
    .fail(function(error) {
      console.log(error.responseJSON);
      $("#modal-body").html('<h4>Select a Project to</h4>\
                                <p style="color:red;">\
                                You Currently have no projects</p>\
                                <p>To create one click <b>File - > Create New Project</p>');
    });

  $('#modal').modal('show');
  $('#delete-btn').show();
  $('#delete-btn').on('click', function () {
    if(!$('input:radio[name=project-to-load]:checked').val()){
      $('#page-to-load-selection-error').show();
    }
    else{
      promptRemoveProject($('input[name=project-to-load]:checked').val(), $('input[name=project-to-load]:checked').attr("data-project-name"));
      $('.page-links').each(function(){ $(this).remove(); });
      //getFirstPage();
      //$('#modal').modal('hide');
    }
  });

  $('#save-btn').html('Open');
  $('#save-btn').on('click', function(){

    if(!$('input:radio[name=project-to-load]:checked').val()){
      $('#page-to-load-selection-error').show();
    }
    else{
      getProject($('input[name=project-to-load]:checked').val(), $('input[name=project-to-load]:checked').attr("data-project-name"));
      $('.page-links').each(function(){ $(this).remove(); });
      getFirstPage();

      $('#modal').modal('hide');
    }
  });
}

function getFirstProject(){
  showMessage('Loading your project, please be patient!', 'thumb', 'loading.gif');
  $.post("getProjects.php", {
    accountId: ACCOUNT.ACCOUNTID
  }, function(data) {
    // showMessage("message-div", data, 5000);
    if(data != ""){
      console.log(JSON.parse(data));
      var projectArr = JSON.parse(data);
      if(projectArr.length > 0){
        for(var i = 0; i < projectArr.length; i++){
          PROJECT.PROJECTID = projectArr[0].projectId;
          PROJECT.PROJECTNAME = projectArr[0].projectName;
        }
        getFirstPage();
        localStorage.setItem('webinator-project', JSON.stringify(PROJECT));
        $('#project-name-title').html(PROJECT.PROJECTNAME);
      }
      else{
        $('#template-page-cont').html('<h1 style="text-align:center;color: #980000;">You have no Projects!</h1>\
                                    <h3 style="text-align:center;">To create a new Project click "File" - > "Create New Project"</h3>');

      }
    }
    else{
      alert(data);
    }

    hideMessage();
  });
}