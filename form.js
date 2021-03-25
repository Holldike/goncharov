class Input {
    constructor(selector) {
        this.$el = selector;
    }

    getVal() {
        return this.$el.val();
    }

    clearVal() {
        this.$el.val('');
    }

    showError() {
        this.$el.after('<div class="error">' + this.error + '</div>');
    }

    removeError() {
        if (this.$el.next().hasClass('error')) {
            this.$el.next().remove();

        }
    }

}

class FullName extends Input {
    validate() {
        if (!this.$el.val()) {
            this.error = 'Please enter your name';
            return false;
        }

        return true;
    }
}

class Email extends Input {
    validate() {
        if (!this.$el.val()) {
            this.error = 'Please enter your email';
            return false;
        }

        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(this.$el.val())) {
            this.error = 'Email is not valid';
            return false;
        }

        return true;
    }
}

class Phone extends Input {
    validate() {
        let regex = /^[0-9]+$/

        if (this.$el.val() && !regex.test(this.$el.val())) {
            this.error = 'Only numerical is allowed';
            return false;

        }

        return true;
    }
}

class Text extends Input {
    validate() {
        if (this.$el.val().length < 10 || !this.$el.val()) {
            this.error = '10 symbols is minimum';
            return false;
        }

        return true;
    }
}

$(document).ready(function () {
    let form = $('.form');

    let submit = form.find('button');

    let email = new Email(form.find('input[name=email]'));
    let fullName = new FullName(form.find('input[name=name]'));
    let phone = new Phone(form.find('input[name=phone]'));
    let text = new Text(form.find('textarea'));

    submit.on('click', function () {
        let valid = true;

        fullName.removeError();
        if (!fullName.validate()) {
            fullName.showError();
            valid = false;

        }

        email.removeError();
        if (!email.validate()) {
            email.showError();
            valid = false;

        }

        phone.removeError();
        if (!phone.validate()) {
            phone.showError();
            valid = false;

        }

        text.removeError();
        if (!text.validate()) {
            text.showError();
            valid = false;

        }

        if (valid) {
            if ($(this).next().hasClass('error')) {
                $(this).next().remove();

            }

            $.ajax({
                url: "api/form.php",
                data: {
                    full_name: fullName.getVal(),
                    email: email.getVal(),
                    phone: phone.getVal(),
                    text: text.getVal(),
                },
                method: 'POST'
            }).done(function () {
                $('.form-success-message').addClass('form-success-message-active');
                $('body').css('overflow', 'hidden');

                $('.form-success-message .button').on('click', function () {
                    $('.form-success-message').removeClass('form-success-message-active');
                    $('body').css('overflow', 'visible');

                });

                fullName.clearVal();
                email.clearVal();
                phone.clearVal();
                text.clearVal();
            });

        } else {
            if (!$(this).next().hasClass('error')) {
                $(this).after('<div class="error">Please check the form</div>');
            }
        }
    })

})
