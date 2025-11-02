
(function($){
    $.fn.codeVerify = function(options){
        var defaults = {
            type: 1,        // 1:数字, 2:字母, 3:数字+字母
            figure: 4,      // 长度
            width: '100px',
            height: '30px',
            fontSize: '20px',
            ready: function(){},
            success: function(){},
            error: function(){}
        };

        var settings = $.extend({}, defaults, options);

        return this.each(function(){
            var $this = $(this);

            function randDigit(){
                return Math.floor(Math.random() * 10).toString();
            }
            function randLetter(){
                var letters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz'; // 去除易混字符
                return letters.charAt(Math.floor(Math.random() * letters.length));
            }
            function randMixed(){
                return (Math.random() < 0.5) ? randDigit() : randLetter();
            }

            function generateCode(){
                var code = '';
                for(var i=0;i<settings.figure;i++){
                    if(settings.type === 1) code += randDigit();
                    else if(settings.type === 2) code += randLetter();
                    else code += randMixed();
                }
                return code;
            }

            function render(code){
                $this.css({
                    width: settings.width,
                    height: settings.height,
                    lineHeight: settings.height,
                    fontSize: settings.fontSize,
                    textAlign: 'center',
                    border: '1px solid #ccc',
                    userSelect: 'none',
                    cursor: 'pointer',
                    display: 'inline-block'
                }).text(code).data('cv-code', code);
            }

            // 初次渲染
            var currentCode = generateCode();
            render(currentCode);
            if(typeof settings.ready === 'function') settings.ready.call($this);

            // 点击区：如果页面中有 input 指定了 data-cv-target="#inputId" 则以 input 的值进行校验，
            // 否则触发自定义事件 'codeverify.check' 供外部控制。
            $this.on('click', function(){
                var targetSelector = $this.attr('data-cv-target');
                if(targetSelector){
                    var inputVal = $(targetSelector).val ? $(targetSelector).val() : '';
                    if(String(inputVal).trim() === String($this.data('cv-code'))){
                        if(typeof settings.success === 'function') settings.success.call($this);
                    } else {
                        if(typeof settings.error === 'function') settings.error.call($this);
                    }
                    // 刷新验证码
                    currentCode = generateCode();
                    render(currentCode);
                } else {
                    // 触发外部检查事件
                    $this.trigger('codeverify.check', [$this.data('cv-code')]);
                }
            });

            // 外部可以调用 $(selector).refreshCode() 来刷新
            $this[0].refreshCode = function(){
                currentCode = generateCode();
                render(currentCode);
            };

        });
    };
})(jQuery);
