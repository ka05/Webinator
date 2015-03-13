// draggable - dropable js code

// make items draggable
$('.draggable').draggable({
  start: function(event, ui) {             
    $(ui.helper).find('.tooltip').hide();   
    $(ui.helper).find('.tooltip').remove();   
    $(this).removeAttr('data-toggle');       
  }, 
  zIndex:10,
  appendTo:'#template-page-cont',
  snap:'.ui-droppable', 
  snapMode:'inner',
  helper: "clone",
  cancel: false
});

$('#template-page-cont').droppable({
  accept: ".dropable",
  drop:function(e,u){
    if(PAGE.PAGEID != ""){
      var a=u.helper.clone();
      $(this).append(a);
      // addGuidelines(a);
      initDraggable($(a));
    }
    else{
      alert("Please Create a Page First!");
    }
  }  
});

function initDraggable(_ele){
  // make contenteditable
  _ele.attr('contenteditable','true');
  _ele.find("label").attr('contenteditable','true');
  _ele.find("input").attr('contenteditable','true');
  _ele.find("figcaption").attr('contenteditable','true');

  enableToolbar();

  // handles double click issues with content-editable
  _ele.find(_ele.attr('data-ele-type')).dblclick(function() {
    // disables dragging so contenteditable will work
    _ele.draggable({ disabled: true });

    // creates glowing border around selected item so use can style the item
    _ele.css('box-shadow', "0px 0px 4px 2px red");
  });

  _ele.find("figcaption").on("click", function(){
    
    _ele.find("figcaption").focus();
  });

  _ele.find("input").on("click", function(){
    
    _ele.find("input").focus();
  });

  _ele.find("label").on("click", function(){
    
    _ele.find("label").focus();
  });

  // handles removing box-shadow when focus is gone
  $(document).mouseup(function (e){
      if (!_ele.is(e.target) // if the target of the click isn't the container...
          && _ele.has(e.target).length === 0 && $('.popover').has(e.target).length === 0){ // ... nor a descendant of the container
      
        _ele.removeClass('editing');
        _ele.popover('hide');
      }
      else{
        _ele.addClass('editing');
      }
  });

  // adds context menu to each dragged out item
  postDragOutElement(_ele);

  _ele.resizable({
    handles:"all"
  }); 

  _ele.attr('class','dropped');

  // change properties if img
  if(_ele.find("img").hasClass('blank-img')){
    _ele.attr("contenteditable", "false");
    _ele.find("img").css("height", "90%");
    _ele.find("figcaption").attr("contenteditable", "true");
  }

  if(_ele.find("input").hasClass("dropped") || _ele.find("select").hasClass("dropped")){
    _ele.find("input").css({ 
      position:"static",  
      width:"100%",
      height:"100%"
    });
  }

  if(_ele.attr("data-item") == "button"){
    _ele.addClass("btn");
    _ele.addClass("btn-default");
    _ele.find('button').removeClass('btn');
    _ele.find('button').removeClass('btn-default');
  }

  _ele.draggable({
    containment: '#template-page-cont',
    start:function(event, ui){
      _ele.popover('hide');
    },
    stop: function( event, ui ) {
      updatePanels(_ele);
    },
    snap:'.ui-droppable',
    snapMode:'inner',
    cancel: false
    // revert:true
  });

  // add click event listener to build popoverContent
  $('.dropped').on('click', function(){
    currEle = $(this);
    buildPopoverContent($(this));
  });

  handleOddEles(_ele);
  updatePanels(_ele);
  addPopover();
}

function handleOddEles(_ele){
  //handle empty-div
  if(_ele.attr('data-type') == 'empty-div'){
    _ele.addClass('empty-div-post');
    _ele.find('div').removeClass('empty-div-pre');
  }
}

function addOption(_ele, _value, _text){
  _ele.find('select').append('<option value="' + _value + '">' + _text + '</option>');
  editOptions();
}

function removeOption(_val){
  currEle.find('option[value='+ _val + ']').remove();
}

function editOptions(){
  resetModal();

  $('#modal').modal('show');
  $("#modal-title").html('Edit Options');
  var content = '<table class="table"><thead><tr><th>Name</th><th>Value</th><th></th><th></th></tr></thead><tbody>';

  currEle.find('option').each(function () {
    var currOpt = $(this);
    var currVal = $(this).attr('value');
    content += '<tr><td>' + $(this).html() + '</td><td>' + $(this).attr('value') + '</td><td></td><td><input type="button" class="btn btn-danger" onclick="$(this).parent().parent().remove();removeOption(\'' + currVal +'\');" value="Delete"/></td></tr>';

  });
  
  //add an option
  content += '<tr><td><input type="text" class="form-control" id="option-name-input" placeholder="Name"/></td><td><input class="form-control"  type="text" id="option-value-input" placeholder="Value"/></td><td><input class="btn btn-primary" type="button" value="Add" onclick="addOption(currEle, $(\'#option-value-input\').val(), $(\'#option-name-input\').val())"/></td></tr>';
  
  content += '</tbody></table>';
  $("#modal-body").html(content);
  $('#save-btn').html('Done');
  $('#save-btn').on('click', function() {
    $('#modal').modal('hide');
  });
}


function editRadioBtns(){
  $('#modal').modal('show');
  $("#modal-title").html('Edit Radio Buttons');
  var currRadioGroupName,
    content = '<div class="input-group">'
      + '<span class="input-group-addon">Radio Group Name:</span>'
      + '<input type="text" class="form-control" placeholder="Group Name" id="radio-group-name" onkeyup="addRadioName($(this).val())">'
      + '</div><br>'
      + '<table class="table" id="edit-radio-tbl"><thead><tr><th>Name</th><th>Text</th><th>Value</th><th>ID</th><th></th></tr></thead><tbody>';

  currEle.find('.radio-group').each(function () {
    currRadioGroupName = $(this).find('input[type=radio]').attr('name');
    content += '<tr><td class="radio-group-name">' + currRadioGroupName
    + '</td><td>' + $(this).find('label').html()
    + '</td><td>' + $(this).find('input[type=radio]').val()
    + '</td><th>' + $(this).find('input[type=radio]').attr('id')
    + '</th><td><input type="button" class="btn btn-danger" onclick="$(this).parent().parent().remove();removeRadio(\'' + $(this).find('input[type=radio]').attr('id') +'\');" value="Delete"/></td></tr>';

  });

  //add an option
  content += '<tr><td class="radio-group-name" id="radio-group-name-content">' + currRadioGroupName + '</td>' +
  '<td><input type="text" class="form-control" id="radio-label-input" placeholder="Text"/></td>' +
  '<td><input class="form-control"  type="text" id="radio-value-input" placeholder="Value"/></td>' +
  '<td><input class="form-control" type="text" id="radio-id-input" placeholder="ID"/></td>' +
  '<td><input class="btn btn-primary" type="button" value="Add" onclick="addRadio(currEle, $(\'#radio-value-input\').val(), $(\'#radio-label-input\').val(), $(\'#radio-id-input\').val(), $(\'#radio-group-name-content\').html())"/></td></tr>';

  content += '</tbody></table><div class="alert alert-danger" role="alert" id="radio-empty-input-err" style="display: none;">You must fill out all inputs!</div>';
  $("#modal-body").html(content);
  $("#save-btn").html("Done");
  $('#save-btn').on('click', function(){
    $('#modal').modal('hide');
  });
}

function addRadioName(_val){
  console.log('dumb');
  $('#edit-radio-tbl').find('.radio-group-name').each(function(){
    $(this).html(_val);
  });
  currEle.find('input[type=radio]').each(function () {
    $(this).attr('name', _val);
  });
}

function addRadio(_ele, _value, _text, _id, _name){
  if(_value != "" && _text != "" && _id != ""){
    _ele.append('<div class="radio-group" data-div="' + _id + '"><input type="radio" name="' + _name + '" id="' + _id + '" value="' + _value + '"><label for="radio-btn-3">' + _text + '</label></div>');
    editRadioBtns();
  }
  else{
    $('#radio-empty-input-err').show();
  }
}

function removeRadio(_val){
  console.log(_val);
  currEle.find('.radio-group').each(function() {
    if($(this).attr('data-div') == _val){
      $(this).remove();
    }
    console.log($(this).attr('data-div'));
  });
}

function editCheckBoxes(){
  $('#modal').modal('show');
  $("#modal-title").html('Edit Checkboxes');
  var content = '<table class="table" id="edit-checkbox-tbl">' +
    '<thead><tr><th>Name</th><th>Text</th><th>Value</th><th>ID</th><th></th></tr></thead><tbody>';

  currEle.find('.checkbox-group').each(function () {
    content += '<tr><td>' + $(this).find('input[type=checkbox]').attr('name')
    + '</td><td>' + $(this).find('label').html()
    + '</td><td>' + $(this).find('input[type=checkbox]').val()
    + '</td><th>' + $(this).find('input[type=checkbox]').attr('id')
    + '</th><td><input type="button" class="btn btn-danger" onclick="$(this).parent().parent().remove();removeCheckbox(\'' + $(this).find('input[type=checkbox]').attr('id') +'\');" value="Delete"/></td></tr>';

  });

  //add an option
  content += '<tr><td><input type="text" class="form-control" id="checkbox-name-input" placeholder="Name"/></td>' +
  '<td><input type="text" class="form-control" id="radio-label-input" placeholder="Text"/></td>' +
  '<td><input class="form-control"  type="text" id="radio-value-input" placeholder="Value"/></td>' +
  '<td><input class="form-control" type="text" id="radio-id-input" placeholder="ID"/></td>' +
  '<td><input class="btn btn-primary" type="button" value="Add" onclick="addCheckbox(currEle, $(\'#radio-value-input\').val(), $(\'#radio-label-input\').val(), $(\'#radio-id-input\').val(), $(\'#checkbox-name-input\').val())"/></td></tr>';

  content += '</tbody></table><div class="alert alert-danger" role="alert" id="checkbox-empty-input-err" style="display: none;">You must fill out all inputs!</div>';
  $("#modal-body").html(content);
  $("#save-btn").html("Done");
  $('#save-btn').on('click', function(){
    $('#modal').modal('hide');
  });
}

function addCheckbox(_ele, _value, _text, _id, _name){
  if(_value != "" && _text != "" && _id != ""){
    _ele.append('<div class="checkbox-group" data-div="' + _id + '"><input type="checkbox" name="' + _name + '" id="' + _id + '" value="' + _value + '"><label for="' + _id + '">' + _text + '</label></div>');
    editCheckBoxes();
  }
  else{
    $('#checkbox-empty-input-err').show();
  }
}

function removeCheckbox(_val){
  currEle.find('.checkbox-group').each(function() {
    if($(this).attr('data-div') == _val){
      $(this).remove();
    }
  });
}

function addPopover(){
  $('#template-page-cont').children().each(function(){
    if( !$(this).hasClass('ui-wrapper') && !$(this).hasClass('ui-resizable-handle') ){
      $(this).popover('destroy');
      // if($(this).has){
        $(this).popover({
          html : true,
          content : buildPopoverContent($(this)),
          placement : "left"
        });
        currEle = $(this);
      // }
      
    }
  });
}

function buildPopoverContent(_ele){
  //hide btns on toolbar
  $('#add-img-url-btn').hide();
  $('#add-fillertext-btn').hide();
  $('#add-link-btn').hide();
  $('#edit-options-btn').hide();
  $('#add-placeholder-btn').hide();

  switch(_ele.attr('data-item')){
    case "div":
      var content = '<div><h4>Styles</h4><hr class="sm-hr"><div style="float:left;margin-right:10px;">'
        + getStyleChanger("Border Width") + getStyleChanger("Border Radius")
        + getStyleChanger("Background Color")
        + '<div class="clearfix"></div></div><div style="float:left;margin-right:10px;">'
          // + getStyleChanger("Font Color") + getStyleChanger("Font Size")
        + getStyleChanger("Border Style") + getStyleChanger("Border Color")
        + getStyleChanger("Opacity")
        + '<div class="clearfix"></div></div></div>'
        + '<div><h4>Position/Layout</h4><hr class="sm-hr"><div style="float:left;margin-right:10px;">'
        + getStyleChanger("Position") + getStyleChanger("% Width")
        + '<div class="clearfix"></div></div><div style="float:left;margin-right:10px;">'
        + getStyleChanger("Inner Space") + getStyleChanger("Outter Space")
        + '<div class="clearfix"></div></div></div>';

      $('#style-tab').html(content);
      return content;
      break;
    case "select":
      var content = '<h4>Actions</h4><hr class="sm-hr">' + getAttrChanger("Edit Options");
      $('#style-tab').html(content);
      $('#edit-options-btn').show();
      return content;
      break;
    case "a":
      var content = '<h4>Actions</h4><hr class="sm-hr">' + getAttrChanger("Link Address")
        + '<h4>Styles</h4><hr class="sm-hr"><div style="float:left;margin-right:10px;">'
        + getStyleChanger("Font Color")  + '<br>' + getStyleChanger("Font Size")
        + '<div class="clearfix"></div></div>';

      $('#style-tab').html(content);
      $('#add-link-btn').show();
      return content;
      break;
    case "p":
      var content = '<div style="float:left;">'
        + getAttrChanger("Add Filler Text")
        + '<h4>Styles</h4><hr class="sm-hr">'
        + getStyleChanger("Font Family")
        + getStyleChanger("Font Color") + '<br>'
        + getStyleChanger("Font Size")
        + getStyleChanger("Text Align")
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      $('#add-fillertext-btn').show();
      return content;
      break;
    case "h1":
      var content = '<div style="float:left;"><h4>Styles</h4><hr class="sm-hr">'
        + getStyleChanger("Font Family") + '<br>'
        + getStyleChanger("Font Color") + '<br>'
        + getStyleChanger("Font Size") + '<br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "figure":
      var content = '<h4>Image Source</h4><hr class="sm-hr">'
        + getAttrChanger("Image Source")
        + '<h4>Styles</h4><hr class="sm-hr">'
        + getStyleChanger("Font Family") + '<br>'
        + getStyleChanger("Font Color") + '<br>'
        + getStyleChanger("Font Size") + '<br><br>';

      $('#style-tab').html(content);
      $(_ele).on('resize', function(){
        if($(_ele).width()){
          $(_ele).find('img').css("width", $(_ele).width());
        }
      });

      //shows add url button
      $('#add-img-url-btn').show();
      return content;
      break;
    case "textbox":
      var content = '<div style="float:left;">'
        + getAttrChanger("Placeholder Text")
        + '<div class="clearfix"></div></div>';
      $('#add-placeholder-btn').show();
      $('#style-tab').html(content);
      return content;
      break;
    case "radio":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Edit Radio Btns") + '<br>'
        + '<h4>Styles</h4><hr class="sm-hr">'
        + getStyleChanger("Font Family") + '<br>'
        + getStyleChanger("Font Color") + '<br>'
        + getStyleChanger("Font Size") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "checkbox":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Edit Checkboxes") + '<br>'
        +'<h4>Styles</h4><hr class="sm-hr">'
        + getStyleChanger("Font Family") + '<br>'
        + getStyleChanger("Font Color") + '<br>'
        + getStyleChanger("Font Size") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "ul":
      var content = '<div style="float:left;"><h4>Styles</h4><hr class="sm-hr">'
        + getStyleChanger("Font Family") + '<br>'
        + getStyleChanger("Font Color") + '<br>'
        + getStyleChanger("Font Size") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "button":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Add Event") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    // bootstrap elements
    case "dropdown":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Add Event") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "btngroup":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Add Event") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "inputgroup":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Add Event") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "navpills":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Add Event") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "paginate":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Add Event") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "panel":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Add Event") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "table":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Add Event") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
    case "progressbar":
      var content = '<div style="float:left;"><h4>Actions</h4><hr class="sm-hr">'
        + getAttrChanger("Add Event") + '<br><br>'
        + '<div class="clearfix"></div></div>';
      $('#style-tab').html(content);
      return content;
      break;
  }
}

function toggleStyle(_type, _value){
  if(currEle.css(_type) != _value){
    changeEleStyle(_type, _value);
  }
  else{
    changeEleStyle(_type, "");
  }
}


function changeEleStyle(_type, _value){
  currEle.css(_type, _value);
}

function changeEleTag(_newTag){
  var oldEleAttr = currEle.getAttributes(),
      newEle = $('<' + _newTag + '>').html(currEle.html())
  currEle.replaceWith(newEle);
  newEle.setAttributes(oldEleAttr);

  newEle.draggable({
    containment: '#template-page-cont'
  });
}

function showAddPlaceholderText(){
  resetModal();

  $('#modal').modal('show');
  $("#modal-title").html('Add Placeholder Text');
  var content = '<span id="placeholder-error-msg" style="display:none;">Please Enter placeholder text to be displayed in the text box!</span>' +
                '<input type="text" class="form-control" id="placeholder-text-input" placeholder="Placeholder Text to display"/>';

  $("#modal-body").html(content);
  $('#save-btn').on('click', function() {
    if($('#placeholder-text-input').val() != ""){
      addPlaceholderText($('#placeholder-text-input').val());
      $('#modal').modal('hide');
    }
    else{
      $('#placeholder-error-msg').show();
    }
  });
}

function addPlaceholderText(_text){
  currEle.find("input").attr("placeholder", _text);
}

function addFillerTxt(){
  currEle.append("<br>Nunc vehicula lacinia ante non hendrerit. Morbi sit amet ornare felis. Sed tempus pretium mollis. \
                  Etiam fringilla lacus eget tellus rutrum lacinia. Vestibulum ultrices posuere lectus, et accumsan mauris viverra nec.\
                  Praesent imperdiet diam ante, sed porta elit tempus eget. Proin sit amet nibh sed felis molestie pellentesque sed ac ante.\
                  Integer gravida, risus at euismod rhoncus, elit purus pulvinar ante, at auctor leo elit quis erat.");
}

function getAttrChanger(_type){
  switch(_type){
    case "Image Source":
      return '<input type="button" class="btn btn-primary btn-md" value="Add Img URL" onclick="displayAddURLModal()">';
      break;
    case "Add Filler Text":
      return '<input style="margin:5px;" type="button" class="btn btn-primary" value="Add Filler Text" onclick="addFillerTxt();"><br><br>';
      break;
    case "Edit Options":
      return '<input style="margin:5px;" type="button" class="btn btn-primary" value="Edit Options" onclick="editOptions();">';
      break;
    case "Link Address":
      return '<div class="btn btn-primary btn-md" id="add-link-btn-popover" onclick="showEditLinkModal();" data-toggle="tooltip" data-placement="bottom" title="Link Address">\
                <img src="img/link.png" class="toolbar-btn iga-btn"> Add Link Address\
              </div>';
      break;
    case "Add Event":
      return '<button type="button" class="btn btn-primary btn-important btn-md" onclick="showEventModal(currEle)">\
                  <span >Add Event</span>\
              </button>';
      break;
    case "Edit Radio Btns":
      return '<input style="margin:5px;" type="button" class="btn btn-primary" value="Edit Radio Btns" onclick="handleMenu(\'Edit Radio\');">';
      break;
    case "Edit Checkboxes":
      return '<input style="margin:5px;" type="button" class="btn btn-primary" value="Edit Checkboxes" onclick="handleMenu(\'Edit Checkbox\');">';
      break;
    case "Placeholder Text":
      return '<input style="margin:5px;" type="button" class="btn btn-primary" value="Add Placeholder Text" onclick="showAddPlaceholderText();">';
      break;
    default:
      break;
  }
}

function getStyleChanger(_type){
  switch(_type){
    case "Border Radius":
      return 'Border Radius<br> \
        <select style="margin-bottom:5px;" class="form-control" onchange="changeEleStyle(\'border-radius\', $(this).val())">\
          <option value="1px">1px</option>\
          <option value="2px">2px</option>\
          <option value="3px">3px</option>\
          <option value="4px">4px</option>\
          <option value="5px">5px</option>\
          <option value="8px">8px</option>\
          <option value="10px">10px</option>\
          <option value="15px">15px</option>\
          <option value="20px">20px</option>\
        </select>';
      break;
    case "Border Width":
      return 'Border Width<br>\
        <select style="margin-bottom:5px;" class="form-control" onchange="changeEleStyle(\'border-width\', $(this).val())">\
          <option value="1px">1px</option>\
          <option value="2px">2px</option>\
          <option value="3px">3px</option>\
          <option value="4px">4px</option>\
          <option value="5px">5px</option>\
          <option value="8px">8px</option>\
          <option value="10px">10px</option>\
          <option value="15px">15px</option>\
          <option value="20px">20px</option>\
        </select>';
      break;
    case "Border Style":
      return 'Border Style<br>\
        <select style="margin-bottom:5px;" class="form-control" onchange="changeEleStyle(\'border-style\', $(this).val())">\
          <option value="solid">Solid</option>\
          <option value="dotted">Dotted</option>\
          <option value="dashed">Dashed</option>\
          <option value="none">None</option>\
        </select>';
      break;
    case "Border Color":
      return 'Border Color<br> <input style="margin-bottom:5px;" class="form-control" type="color" name="bordercolor" value="#000000" onchange="changeEleStyle(\'borderColor\', $(this).val())">';
      break;
    case "Background Color":
      return 'Background Color<br> <input style="margin-bottom:5px;" class="form-control" type="color" name="bgcolor" value="#000000" onchange="changeEleStyle(\'backgroundColor\', $(this).val())">';
      break;
    case "Opacity":
      return 'Opacity<br> <input style="margin-bottom:5px;" class="form-control" type="range" min ="0" max="1" step =".1" value ="1" onchange="changeEleStyle(\'opacity\', $(this).val())">';
      break;
    case "Font Color":
      return '<div class="input-group input-group-thin">\
                <span class="input-group-addon" data-toggle="tooltip" data-placement="bottom" title="Font Color">\
                  <img src="img/font-color.png" class="toolbar-btn iga-btn">\
                </span>\
                <input class="form-control" type="color" name="fontcolor" value="#000000" onchange="changeEleStyle(\'color\', $(this).val())">\
              </div>';
      break;
    case "Font Size":
      return '<div class="input-group input-group-font-size">\
                <span class="input-group-addon" data-toggle="tooltip" data-placement="bottom" title="Font Size">\
                  <img src="img/text-height.png" class="toolbar-btn iga-btn" >\
                </span>\
                <select class="form-control" onchange="changeEleStyle(\'font-size\', $(this).val())">\
                    <option value="10px">10px</option>\
                    <option value="11px">11px</option>\
                    <option value="12px">12px</option>\
                    <option value="14px">14px</option>\
                    <option value="16px">16px</option>\
                    <option value="18px">18px</option>\
                    <option value="20px">20px</option>\
                    <option value="24px">24px</option>\
                    <option value="26px">26px</option>\
                    <option value="28px">28px</option>\
                    <option value="36px">36px</option>\
                    <option value="48px">48px</option>\
                    <option value="72px">72px</option>\
                  </select>\
              </div>';
      break;
    case "Font Family":
      return '<div class="input-group">\
                <span class="input-group-addon" data-toggle="tooltip" data-placement="bottom" title="Font Family">\
                  <img src="img/font.png" class="toolbar-btn iga-btn" >\
                </span>\
                <select class="form-control" onchange="changeEleStyle(\'font-family\', $(this).val())">\
                  <option value="Georgia">Georgia</option>\
                  <option value="Times New Roman">Times New Roman</option>\
                  <option value="Arial">Arial</option>\
                  <option value="Impact">Impact</option>\
                  <option value="Verdana">Verdana</option>\
                  <option value="Trebuchet MS">Trebuchet MS</option>\
                  <option value="Courier New">Courier New</option>\
                  <option value="Comic Sans MS">Comic Sans MS</option>\
                </select>\
              </div>';
      break;
    case "Text Align":
      return '<div class="btn-group">\
                <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="bottom" title="Align Left">\
                  <img src="img/paragraph-left.png" class="toolbar-btn" onclick="changeEleStyle(\'text-align\', \'left\')">\
                </button>\
                <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="bottom" title="Align Center">\
                  <img src="img/paragraph-center.png" class="toolbar-btn" onclick="changeEleStyle(\'text-align\', \'center\')">\
                </button>\
                <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="bottom" title="Align Right">\
                  <img src="img/paragraph-right.png" class="toolbar-btn" onclick="changeEleStyle(\'text-align\', \'right\')">\
                </button>\
              </div>';
      break;
    case "State":
      return '<h3>State</h3>\
              <label><input type="checkbox" id="inspectable_checked" checked="" onclick="checkChanged($(this))">Checked</label>\
              <label><input type="checkbox" id="inspectable_disabled" checked="" onclick="checkChanged($(this))">Enabled</label>';
      break;
    case "% Width":
      return 'Width (%)<br><select style="margin-bottom:5px;" class="form-control" onchange="changeEleStyle(\'width\', $(this).val())">\
          <option value="100%">100%</option>\
          <option value="90%">90%</option>\
          <option value="80%">80%</option>\
          <option value="70%">70%</option>\
          <option value="60%">60%</option>\
          <option value="50%">50%</option>\
          <option value="40%">40%</option>\
          <option value="30%">30%</option>\
          <option value="20%">20%</option>\
          <option value="10%">10%</option>\
        </select>';
      break;
    case "Position":
      return 'Position<br><select style="margin-bottom:5px;" class="form-control" onchange="changeEleStyle(\'position\', $(this).val())">\
          <option value="fixed">fixed</option>\
          <option value="absolute">absolute</option>\
          <option value="relative">relative</option>\
          <option value="static">static</option>\
        </select>';
      break;
    case "Heading Size":
      return 'Heading Size<br><select style="margin-bottom:5px;" class="form-control" onchange="changeEleTag($(this).val())">\
          <option value="h1">h1</option>\
          <option value="h2">h2</option>\
          <option value="h3">h3</option>\
          <option value="h4">h4</option>\
          <option value="h5">h5</option>\
          <option value="h6">h6</option>\
        </select>';
      break;
    case "Inner Space":
      return 'Inner Space (Padding)<br> <input style="margin-bottom:5px;" class="form-control" type="range" min="0" max="40" step="2" value ="0" onchange="changeEleStyle(\'padding\', $(this).val())">';
      break;
    case "Outter Space":
      return 'Outter Space (Margin)<br> <input style="margin-bottom:5px;" class="form-control" type="range" min="0" max="40" step="2" value ="0" onchange="changeEleStyle(\'margin\', $(this).val())">';
      return 'Outter Space (Margin)<br> <input style="margin-bottom:5px;" class="form-control" type="range" min="0" max="40" step="2" value ="0" onchange="changeEleStyle(\'margin\', $(this).val())">';
      break;
    default:
      break;
  }
}

function checkChanged(_ele){
  switch(_ele.id){
    case "inspectable_checked":
      if(_ele.prop("checked") == true){
        currEle.prop("checked", true);
      }
      break;
    case "inspectable_disabled":
      if(_ele.prop("checked") == true){
        currEle.prop("disabled", true);
      }
      break;
  }
}

// NOT CURRENTLY USING - WILL BE USED FOR GUIDELINES LATER ON


//var MIN_DISTANCE = 10; // minimum distance to "snap" to a guide
//var guides = []; // no guides available ...
//var innerOffsetX, innerOffsetY; // we'll use those during drag ...
//
//// possible guidline working
//function computeGuidesForElement( elem, pos, w, h ){
//  if( elem != null ){
//    var $t = $(elem);
//    pos = $t.offset();
//    w = $t.outerWidth() - 1;
//    h = $t.outerHeight() - 1;
//  }
//
//  return [
//    { type: "h", left: pos.left, top: pos.top },
//    { type: "h", left: pos.left, top: pos.top + h },
//    { type: "v", left: pos.left, top: pos.top },
//    { type: "v", left: pos.left + w, top: pos.top },
//    // you can add _any_ other guides here as well (e.g. a guide 10 pixels to the left of an element)
//    { type: "h", left: pos.left, top: pos.top + h/2 },
//    { type: "v", left: pos.left + w/2, top: pos.top }
//  ];
//}
