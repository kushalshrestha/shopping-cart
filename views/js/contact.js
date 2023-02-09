$(() => {
    fetch('/js/contactinfo.txt')
    .then(data=>data.text())
    .then(success)
    .catch(fail);

    function success(data){
        $('#body').append('<pre>' + data + '</pre>')
    }

    function fail(data){
        console.log('adfsads');
    }
  });
  