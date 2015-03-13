/**
 * Created by Clay on 12/15/2014.
 */

function showMessage(_message, _type, _iconName, _timeout){

  var iconName = "img/" + _iconName;
  // create the notification
  switch(_type){
    case "thumb":
      notification = new NotificationFx({
        message : '<div class="ns-thumb"><img src="' + iconName + '" height="50" width="50" style="margin:8px;border-radius: 10px;"/></div><div class="ns-content"><p>' + _message + '</p></div>',
        layout : 'other',
        effect : 'thumbslider',
        type : 'notice', // notice, warning, error or success
        wrapper:document.getElementById('msg-div')
      });
      break;
    case "slidetop":
      notification = new NotificationFx({
        message : '<span class="icon"><img src="' + iconName + '" height="50" width="50" style="margin:8px;border-radius: 10px;" /></span><p>' + _message + '</p>',
        layout : 'bar',
        effect : 'slidetop',
        type : 'notice', // notice, warning or error
        wrapper:document.getElementById('msg-div')
      });
      break;
  }

  // show the notification
  notification.show();
  if(_timeout){
    setTimeout(function(){
      notification.dismiss();
    }, _timeout);
  }
}

function hideMessage(){
  notification.dismiss();
  $('#msg-div').html("");
}

function setPaneHeight(){
  var newHeight =  $(window).height() - 100 + "px",
    componentHeight = $(window).height() - 130 + "px",
    tmplHeight = $(window).height() - 140 + "px";
  $('.template-page-cont').each(function(){
    $(this).css('height', tmplHeight );
  });
  $('#components').css('height', componentHeight);
  $('#styling').css('height', componentHeight);
  $('#bootstrap-components').css('height', componentHeight);

}

function enableToolbar(){
  $('#toolbar').find('select').prop('disabled', false);
  $('#toolbar').find('button').prop('disabled', false);
  $('#toolbar').find('input').prop('disabled', false);
}