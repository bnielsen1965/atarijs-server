$(document).ready(function() {

  $( ".driveitem" ).droppable({
    scope: 'driveimage',
    drop: function( event, ui ) {
      $(this).find('.imagefile').html(ui.helper.html());
      loadImage($(this).data('drivenumber'), ui.helper.html());
    }
  });

  getImageFilesList();
});


function getImageFilesList() {
  var data = {};

  $.ajax({
    type: "POST",
    url: '/api/getimagelist',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType:"application/json; charset=utf-8",
    processData: false,
    success: function(data) {
      if (data.imageFiles) {
        updateImageList(data.imageFiles);
      }
    },
    timeout: 10000,
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
    complete: function(jqXHR, textStatus) {

    }
  });
}


function updateImageList(imageFiles) {
  var listHTML = '<div class="list-group">';
    imageFiles.forEach(function(file) {
      listHTML += '<div class="list-group-item imagefile">' + file + '</div>';
    });
    listHTML+= '</div>';

    $('#imagefiles').html(listHTML);

    $('.imagefile').draggable({
      scope: 'driveimage',
      helper: 'clone',
      appendTo: $('#driveimagerow')
    });
}


function loadImage(driveNumber, imageFilename) {
  var data = {
    driveNumber: driveNumber,
    imageFilename: imageFilename
  };

  $.ajax({
    type: "POST",
    url: '/api/loadimage',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType:"application/json; charset=utf-8",
    processData: false,
    success: function(data) {

    },
    timeout: 10000,
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
    complete: function(jqXHR, textStatus) {

    }
  });
}
