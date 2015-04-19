'use strict';

(function(global, $) {
  $(document).ready(function() {
    $('.fancy-box').fancybox({
      padding: 0
    });
    
    $('.tabs').tabs();

    $.each(['#consult-form', '#first-step-popup form', '#what-next-form',
            '#lawer-popup form', '#by-yourself-popup form', '#ses-popup form',
            '#building-popup form', '#fire-popup form', '#start-now-form',
            '#any-questions-form'], function(index, value) {
      $(value).validate({
        rules: {
          'name': {required: true},
          'phone': {required: true}
        },
        submitHandler: function(form) {
          var targetForm = $(form),
              postData = targetForm.serializeArray(),
              formURL = targetForm.attr('action');

          $.ajax({
            url : formURL,
            type: 'POST',
            data : postData,
            success:function(data, textStatus, jqXHR) {
              //data: return data from server
              targetForm[0].reset();
              alert('Спасибо, ваше письмо было доставлено нашим специалистам!');
              window.location.replace("http://google.com");
            },
            error: function(jqXHR, textStatus, errorThrown) {
              //if fails      
              targetForm[0].reset();
              alert('Что-то пошло не так. Пожалуйста, перезагрузите страницу и попробуйте еще раз..');
            }
          });
        },
        errorPlacement: function(error, element) {}
      });
    });
  });
})(window, jQuery);
