;(function($,window,undefined) {
    $.fn.kkCountDown = function(options) {
        var defaults = {
            starttime: '',              //start time
            endtime: '',                //end time
            hidenull: '',                //hide 00 value
            startCallBack: $.noop,      //time start callback
            notStartCallBack: $.noop,   //time not start callback
            endCallBack: $.noop         //time end callback
        },
        
        opts = $.extend(defaults, options);
        return this.each(function(i,v){
            var timeCountDown = {
                timer: null,
                countDown: function(){
                    var _this = this;
                    var nowTime = Math.round(new Date().getTime()/1000),
        				startTime = Math.round(new Date(opts.starttime) / 1000);
                        endTime = Math.round(new Date(opts.endtime) / 1000);
                        hidenull =opts.hidenull;

                    var endLeftTime = endTime - nowTime,
        				startLeftTime = startTime - nowTime,
        				day = parseInt(endLeftTime / 60 / 60 / 24),
                        hour = parseInt(endLeftTime / 60 / 60 % 24),
                        minute = parseInt(endLeftTime / 60 % 60),
                        second = parseInt(endLeftTime % 60),
        				ms = parseInt((new Date(opts.endtime) - new Date().getTime()) % 1000);

                    return{
        				endLeftTime: endLeftTime,
        				startLeftTime: startLeftTime,
                        day: day,
                        hour: hour,
                        minute: minute,
                        second: second,
        				ms: ms
                    }
                },
                setHtml: function(time){
                    var _this = this,
        				_endLeftTime = time.endLeftTime,
        				_startLeftTime = time.startLeftTime,
                        _day = _this.fillZero(time.day),
                        _hour = _this.fillZero(time.hour),
                        _minite = _this.fillZero(time.minute),
                        _second = _this.fillZero(time.second),
        				_ms = _this.fillZero(time.ms.toString().substr(0,1));
                    if(_endLeftTime == 0 ){
                        _ms = '0';
                    }
                    if(_startLeftTime > 0){
                        if(opts.notStartCallBack){
                            opts.notStartCallBack(time);
                        }
                    }
                    else{
            			if(_endLeftTime >= 0){
                            $(v).html([
            					'<li class="item itemVal'+_day +' hide'+hidenull+'"><i class="day">'+_day+'</i><span>days</span></li>',
            					'<li class="blank itemVal'+_day +' hide'+hidenull+'">:</li>',
            					'<li class="item itemVal'+_hour +' hide'+hidenull+'"><i class="hour">'+_hour+'</i><span>hours</span></li>',
            					'<li class="blank itemVal'+_hour +' hide'+hidenull+'">:</li>',
            					'<li class="item itemVal'+_minite +' hide'+hidenull+'"><i class="minute">'+_minite+'</i><span>minutes</span></li>',
            					'<li class="blank itemVal'+_minite +' hide'+hidenull+'">:</li>',
            					'<li class="item"><i class="second">'+_second+'.'+_ms+'</i><span>seconds</span></li>',
            				].join(' '));
                            if(opts.startCallBack){
                                $('.sale-label').text('Hurry up! Sale Ends in');
                                opts.startCallBack(time);
                            }
                        }

                        if(_endLeftTime <= 0){
                            if(opts.endCallBack){
                                $('.expHide').hide()
                                $('.sale-label').text('Flash sale has ended');
                                opts.endCallBack(time);
                            }
                            clearInterval(_this.timer);
                        }
                    }
                },
                fillZero: function(num){
                    if (num < 10) {
                        num = "0" + num;
                    }
                    return num;
                },
                init: function(){
                    var _this = this;
                    if(new Date(opts.endtime) <= new Date(opts.starttime)){
                        throw new Error('Error');
                        return false;
                    }
                    this.timer = setInterval(function(){
                        _this.setHtml(_this.countDown());
                    },10);
                }
            }
            timeCountDown.init();
        });
    };
})(jQuery,window,undefined);
