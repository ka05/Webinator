// JS for File Menu 

function handleMenu(_menuTitle){
  menu = _menuTitle.attr('data-menu');
  switch(menu){
    case "about":
      $('#modal').modal('show');
      $("#modal-title").html('About Webinator');
      $("#modal-body").html('<div style="text-align:center;"><img src="img/webinator.png"><h4>An easy to use Web IDE</h4></div>');
      $("#save-btn").hide();
      break;
    case "version":
      $('#modal').modal('show');
      $("#modal-title").html('Webinator Version 1.0 Beta');
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
      $('#modal').modal('show');
      $("#modal-title").html('Save as');
      $("#modal-body").html('<h4>Filename:</h4><input id="inputFileNameToSaveAs">');
      $("#save-btn").show();
      $("#save-btn").html("Save");
      $('#save-btn').unbind( "click" );
      $('#save-btn').on('click', function(){
        saveTextAsFile($('#inputFileNameToSaveAs').val());
        $('#modal').modal('hide');
      });
      break;
    case "save to cloud":
      $('#modal').modal('show');
      $("#modal-title").html('Confirm Save');
      $("#modal-body").html('Are you sure you want to save?');
      $("#save-btn").show();
      $("#save-btn").html("Yes");
      $('#save-btn').unbind( "click" );
      $('#save-btn').on('click', function(){
        //write current doc to local storage
        //use special key to store with (filename chosen by user and date)



        //saveTextAsFile('index.html');
        $('#modal').modal('hide');
      });
      break;
    case "create new project":
      createNewProject();
      break;
    case "create new page":
      createNewPage();
      break;
    case "open":
      $('#modal').modal('show');
      $("#modal-title").html('Open file');
      var pagesArr;

      $.post("getPages.php", {
        projectId: PROJECTID
      }, function(data) { 
        // showMessage("message-div", data, 5000);
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        

      });

      var fileList = '<ul class="file-list">';
      // for(){
          fileList += '<li></li>';
      // }

      fileList += '</ul>';

      $("#modal-body").html('<h4>Select a File to Load:</h4>\
                              <input type="file" id="fileToLoad" style="border:none; border-color: none; box-shadow: none; outline: none;">\
                              OR <br><br>' + fileList );
      
      $('#save-btn').html('Open');
      $('#save-btn').unbind( "click" );
      $('#save-btn').on('click', function(){
        loadFileAsText();
        $('#modal').modal('hide');
      });

      break;
    case "open from server":
      $('#modal').modal('show');
      $("#modal-title").html('Open from server');
      $("#modal-body").html('Development in progress...');
      
      $('#save-btn').html('Open');
      $('#save-btn').unbind( "click" );
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
      $('#modal').modal('show');
      $("#modal-title").html('Account Details');
      $("#modal-body").html('Development in progress...');
      $("#save-btn").hide();
      break;
    case "projects":
      $('#modal').modal('show');
      $("#modal-title").html('Projects');
      $("#modal-body").html('Development in progress...');
      $("#save-btn").hide();
      break;
    case "logout":
      localStorage.removeItem('webinator-username');
      $('#account-bar').html('<button type="button" class="btn-sp" onclick="showLogin();">\
                                <a>Login</a>\
                              </button>');
      $('#account-bar').removeClass('logged-in');
      $('#file-menu').find('li').addClass('disabled');
      break;
  }
}

function loadFileAsText()
{
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

function saveTextAsFile(_fileName)
{
  // update data in html panel
  updatePanels(currEle);
  var textToWrite = '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
                    + '\n<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>'
                    + '\n</head>\n<body>\n' + currentDoc 
                    + '\n<script type="text/javascript">\n' + JSFILE.replace(/<(?:.|\n)*?>/gm, '') + '\n</script>\n</body>\n</html>';
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

function createNewPage(){
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
      $.post("createPage.php", {
        pageName: $('#newPageInput').val(),
        projectName: PROJECTNAME,
        accountId: ACCOUNTID
      }, function(data) { 
        // showMessage("message-div", data, 5000);
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        if(data.msg == "Page Created Sucessfully"){
          var pageNameMsg = "Page: " + data.pageName + " Sucessfully Created";
          alert(pageNameMsg); //change to showmessage later
          PAGENAME = data.pageName;
          PROJECTID = data.projectId;
          localStorage.setItem('PROJECTID', PROJECTID);
          $('#modal').modal('hide');
        }
        else{
            $('#create-page-fail-error').show();
        }
        
      });
    }
  });
}

function createNewProject(){
  $('#modal').modal('show');
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
  $('#save-btn').show();
  $('#save-btn').html('Create');
  $('#save-btn').unbind( "click" );
  $('#save-btn').on('click', function(){
    if ($('#newProject').val() == '') {
      alert("Please enter a project name!!");
    }
    else {
      // Returns successful data submission message when the entered information is stored in database.
      $.post("createProject.php", {
        projectName: $('#newProject').val(),
        accountId: ACCOUNTID
      }, function(data) { 
        // showMessage("message-div", data, 5000);
        console.log(data);
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        if(data.msg == "Project Created Sucessfully"){
          var projectNameMsg = "Project: " + data.projectName + " Sucessfully Created";
          alert(projectNameMsg); //change to showmessage later
          PROJECTNAME = data.projectName;

          $('#project-name-title').html(PROJECTNAME);
          $('#modal').modal('hide');
        }
        else{
            $('#create-project-fail-error').show();
        }
        
      });
    }

    $('#modal').modal('hide');
  });
}