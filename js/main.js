// Hello.
//
// This is The Scripts used for ___________ Theme
//
//

function main() {
  (function() {
    "use strict";

    /*====================================
    Main Navigation Stick to Top when Scroll
    ======================================*/
    function sticky_relocate() {
      var window_top = $(window).scrollTop();
      var div_top = $("#sticky-anchor").offset().top;
      if (window_top > div_top) {
        $("#tf-menu").addClass("stick");
      } else {
        $("#tf-menu").removeClass("stick");
      }
    }

    $(function() {
      $(window).scroll(sticky_relocate);
      sticky_relocate();
    });

    $(function() {
      $("a[href*=#]:not([href=#])").click(function() {
        if (
          location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          var target = $(this.hash);
          target = target.length
            ? target
            : $("[name=" + this.hash.slice(1) + "]");
          if (target.length) {
            $("html,body").animate(
              {
                scrollTop: target.offset().top - 70
              },
              1000
            );
            return false;
          }
        }
      });
    });

    $("form#contact").on("submit", function(e) {
      e.preventDefault();

      var button = $("button", this);
      var formData = {};
      var content = "";
      var form = this;

      $("form#contact input, textarea").each(function(index, element) {
        formData[element.name] = $(element).val();
        content +=
          "<li><strong>" +
          element.name +
          "</strong>: " +
          formData[element.name] +
          "</li>";
      });

      var mailData = {
        recipient: "contato@idopterlabs.com.br",
        subject: "Novo contato de: " + formData.email,
        content_html: "<ul>" + content + "</ul>"
      };

      button.attr("disabled", "disabled");
      button.html("Aguarde...");

      $.ajax({
        url: "http://api.idopterlabs.com.br/mailme/notify/now",
        type: "POST",
        data: mailData,
        contentType: "application/x-www-form-urlencoded"
      })
        .done(function(data) {
          form.reset();
          button.html("Obrigado! :)");
        })
        .fail(function(response, status) {
          button.html("Verifique os dados! :|");
        })
        .always(function(data) {
          button.removeAttr("disabled");

          setTimeout(function() {
            button.html("Enviar");
          }, 3000);
        });
    });
  })();
}
main();
