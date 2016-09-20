var helperOpacity = 0.5;

$(document).ready(function() {

  $(".driveitem")
    .droppable({
      scope: 'driveimage',
      drop: function( event, ui ) {
        if (ui.helper.data('parkednumber')) {
          parkedToDrive(ui.helper.data('parkednumber'), $(this).data('drivenumber'));
        }
        else {
          //$(this).find('.imagefile').html(ui.helper.html());
          loadImage($(this).data('drivenumber'), ui.helper.html());
        }
        setTimeout(getStatus, 1000);
      }
    })
    .draggable({
      scope: 'driveimage',
      helper: 'clone',
      appendTo: $('#drivescontainer'),
      opacity: helperOpacity
    });

  $(".saveimage").click(function() {
    saveImage($(this).parents('.driveitem:first').data('drivenumber'));
  });

  $(".parkeditem")
    .droppable({
      scope: 'driveimage',
      drop: function( event, ui ) {
        if (ui.helper.data('drivenumber')) {
          parkDriveImage(ui.helper.find('.imagefile').html(), ui.helper.data('drivenumber'), $(this).data('parkednumber'));
        }
        else {
          // parking an image file
        }
        setTimeout(getStatus, 1000);
      }
    })
    .draggable({
      scope: 'driveimage',
      helper: 'clone',
      appendTo: $('#drivescontainer'),
      opacity: helperOpacity
    });

  getImageFilesList();
  getStatus();
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


function getStatus() {
  var data = {};

  $.ajax({
    type: "POST",
    url: '/api/getstatus',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType:"application/json; charset=utf-8",
    processData: false,
    success: function(data) {
      if (data.status) {
        updateStatus(data.status);
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
  var listHTML = '<div class="list-group"><div class="list-group-item list-group-item-info">Floppy Image Files</div>';
  imageFiles.forEach(function(file) {
    listHTML += '<div class="list-group-item imagefile">' + file + '</div>';
  });
  listHTML+= '</div>';

  $('#imagefiles').html(listHTML);

  $('.imagefile').draggable({
    scope: 'driveimage',
    helper: 'clone',
    appendTo: $('#driveimagerow'),
    opacity: helperOpacity
  });
}


function updateStatus(status) {
  status.drives.forEach(function(driveStatus, index) {
    var $drive = $('#drive' + (index + 1));
    $drive.find('.imagefile').html(driveStatus.filename || '');
    $drive.find('.sectorsize').html(driveStatus.sectorSize || '');
    $drive.find('.sectorcount').html(driveStatus.sectorCount || '');
    $drive.find('.readonly').html((driveStatus.readOnly ? 'RO' : 'RW'));
  });

  status.parked.forEach(function(filename, index) {
    var $parked = $('#parked' + (index + 1));
    $parked.find('.imagefile').html(filename);
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


function parkDriveImage(filename, driveNumber, parkedNumber) {
  var data = {
    filename: filename,
    driveNumber: driveNumber,
    parkedNumber: parkedNumber
  };

  $.ajax({
    type: "POST",
    url: '/api/parkdriveimage',
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


function parkedToDrive(parkedNumber, driveNumber) {
  var data = {
    driveNumber: driveNumber,
    parkedNumber: parkedNumber
  };

  $.ajax({
    type: "POST",
    url: '/api/parkedimagetodrive',
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


function saveImage(driveNumber) {
  var data = {
    driveNumber: driveNumber
  };

  $.ajax({
    type: "POST",
    url: '/api/savedriveimage',
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
