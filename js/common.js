$(document).ready(function(){
    sitemapAct();

    setTimeout(() => {
        listColumnResize();
    }, 1);
    scrollEvent()
    sortable();
    tooltip();
    dropdown();
    date();
    tab();
    accList();
    clickRightBtn();

    dashScroll();
})

/* 20240509 수정 */
function getCurrentSnapIdx(snapValue, top){
    for(let i in snapValue){
        i = Number(i)
        if(snapValue[i] >= top){
            return snapValue[i] > top ? i-1 : i
        }
    }
}

function dashScroll(){
    let snapValue = [0]
    // let lastScrollTop = 0;
    // let snapIdx = 1
    // let snapResult = 100
    // let snapIsLock = false
    // let lastDraggerTop = 0;

    // let dragDir = 0
    
    snapValue = [0]
    $('.snap').find('.gap30').each(function(){
        snapValue.push(snapValue[snapValue.length - 1] + $(this).outerHeight() + 50)
    })

    snapValue.pop()
    
    $('.snap').on("mousewheel", function(e){
        snapMcs.mCustomScrollbar("stop")
        const currentTop = Math.abs(this.mcs.content.css("top").replace("px", ""))
        const currentSnapIdx = getCurrentSnapIdx(snapValue, currentTop)
        let deltaOffset = e.originalEvent.wheelDelta < 0 ? 1 : 0
        if(deltaOffset == 0 && snapValue[currentSnapIdx] == currentTop){
            deltaOffset = -1
        }
        const targetSnapIdx = getCurrentSnapIdx(snapValue, currentTop) + deltaOffset
        snapMcs.mCustomScrollbar('scrollTo', snapValue[targetSnapIdx]);
    })
    
    let snapMcs = $('.snap').mCustomScrollbar({
        axis:"y",
        scrollbarPosition: "outside",
        advanced:{ 
            updateOnContentResize: true 
        },
        mouseWheel:{
            enable: false,
        },
    })
}
/* // 20240509 수정 */

function sitemapAct(){
    sitemapOpen();
    sitemapClose();
}

function sitemapOpen(){
    $('.btn-menu').click(function(){
        $('.sitemap').show();
    })
}

function sitemapClose(){
    $('.btn-sitemap-close').click(function(){
        $('.sitemap').hide();
    })
}

// dim 생성
function dimMaker() {
    if($('body').find('.dim').length > 0){
        return;
    }
    $('body').append('<div class="dim"></div>');
    bodyHidden();
}

// dim 제거
function dimRemove() {
    $('.dim').remove();
    bodyAuto();
}

// body scroll hidden
function bodyHidden() {
    $('body').css('overflow', 'hidden');
}

// body scroll auto
function bodyAuto() {
    $('body').css('overflow', '')
}

// 팝업열기
function popOpen(target){
    $("." + target).addClass('on');
    listColumnResize();
    scrollEvent();
    simpleDate()
}

// 팝업닫기
function popClose(target) {
    $("." + target).removeClass('on');

    $('.popup').css('z-index', '');
}

// dim 옵션 팝업 열기
function popOpenAndDim(target, isDim){
    popOpen(target);
    
    if(isDim == true){
        dimMaker();
    }
}

// dim 옵션 팝업 열기
function popDuble(e, target, isDim){
    $(e).closest('.popup').css('z-index', 97);
    
    popOpen(target);
    
    if(isDim == true){
        dimMaker();
    }
}

// 팝업닫기
function popCloseAndDim(target, isDim) {
    $("." + target).removeClass('on');

    $('.popup').css('z-index', '');
    
    if(isDim == true){
        dimRemove();
    }
}

function listColumnResize(){
    listWidthInit()

    $(".list-wrap.resize").each(function(){
        let thisThHeight = $(this).children('.list-head > table > thead > tr > th:first-child').height();
        let thisTh = $(this).find('.list-head').children('table').children('thead').children('tr').children('th')

        thisTh.resizable({
            handles: "e",
            minHeight: thisThHeight,
            maxHeight: thisThHeight,
            resize: function (event, ui) {
                let thisResize = $(event.target);
                $(thisResize).outerWidth(ui.size.width);
    
                if(!$(this).closest('.list-head').siblings('.list-body').hasClass('scroll-yx')){
                    thisResize.each(function(){
                        $(this).parent('tr').parent('thead').parent('table').parent('.list-head').siblings('.list-body').children('table').children('tbody').children('tr').children('td').eq($(this).index()).outerWidth($(this).outerWidth())
                    })
                } else {
                    $(this).closest('table').width($(this).closest('.list-head').siblings('.list-body').find('table').width())
                    thisResize.each(function(){
                        $(this).closest('.list-head').siblings('.list-body').find('table').children('tbody').children('tr').children('td').eq($(this).index()).outerWidth($(this).outerWidth())
                    })
                }
                
            },
            stop: function(event, ui){
                if($(this).closest('.scroll-x').length > 0) {
                    $(this).closest('.scroll-x').mCustomScrollbar("update");
                } else if($(this).closest('.list-head').siblings('.list-body').hasClass('scroll-yx')) {
                    $(this).closest('.list-head').siblings('.list-body').mCustomScrollbar("update");
                }
            }
        });

        thisTh.each(function(){
            let thisMinW = $(this).data('width') > 100 ? 100:thisTh.data('width')

            $(this).resizable( "option", "minWidth", thisMinW)
        })
        

        $(this).find('th:last-child').children('.ui-resizable-handle').remove();
    })
}

function listWidthInit(){
    $(".list-wrap.v1").each(function(){
        let thisTh = $(this).find('.list-head').children('table').children('thead').children('tr').children('th')
        
        thisTh.each(function(){
            $(this).outerWidth($(this).data('width'))
            $(this).parent('tr').parent('thead').parent('table').parent('.list-head').siblings('.list-body').find('table').children('tbody').children('tr').children('td').eq($(this).index()).outerWidth($(this).data('width'))
        })
    })
}

function scrollEvent(){
    scrollX();
    scrollY();
    scrollYX();
}

function scrollX() {
    $('.scroll-x').each(function(){
        $(this).mCustomScrollbar({
            axis:"x", // horizontal scrollbar
            advanced:{ 
                updateOnContentResize: true 
            },
            scrollbarPosition: "outside",
        });
    })
}

function scrollY() {
    $('.scroll-y').each(function(){
        if($(this).hasClass('pop-body') || $(this).hasClass('inside')){/* 20240522 수정 */
            $(this).mCustomScrollbar({
                axis:"y", // horizontal scrollbar
                advanced:{ 
                    updateOnContentResize: true 
                },
            });
        } else {
            $(this).mCustomScrollbar({
                axis:"y", // horizontal scrollbar
                advanced:{ 
                    updateOnContentResize: true 
                },
                scrollbarPosition: "outside",
            });
        }
    });
}

function scrollYX() {
    $('.scroll-yx').each(function(){
        $(this).mCustomScrollbar({
            axis:"yx", // horizontal scrollbar
            advanced:{ 
                updateOnContentResize: true 
            },
            scrollbarPosition: "outside",
            callbacks: {
                whileScrolling: function () {
                    var scrollPos = $(this).find('.mCSB_container').position();
                    $(this).siblings('.list-head').find('table').css('transform', 'translateX(' + scrollPos.left + 'px)');
                }
            }
        })
    });
}

function sortable(){
    $( ".sortable ul" ).sortable();
}

function tooltip(){
    $(document).tooltip({
        items: "[data-cont]",
        position: {
            at: 'right+13 center',
            my: 'left center',
            collision: "flipfit"
        },
        content: function() {
            let element = $(this);
            if ( element.is( "[data-cont]" ) ) {
                let html = element.data('cont');
                return html;
            }
        },
    })
    
}

function dropdown(){
    $('.dropdown .txt-pick').click(function(){
        $('.dropdown').not($(this).closest('.dropdown')).removeClass('active');
        if(!$(this).closest('.dropdown').hasClass('active')){
            $(this).closest('.dropdown').addClass('active');

            if($(this).closest('.dropdown').hasClass('v1') && $(this).closest('.dropdown').hasClass('row')) {
                $(this).siblings('.drop-list').mCustomScrollbar({
                    axis:"y", // horizontal scrollbar
                    advanced:{ 
                        updateOnContentResize: true 
                    },
                });
            }
        } else {
            $(this).closest('.dropdown').removeClass('active');
        }
    });

    $('.dropdown .drop-list li').click(function(){
        $(this).closest('.dropdown').removeClass('active')
        $(this).closest('.drop-list').siblings('.txt-pick').html($(this).html())
    })

    $('html').click(function(e) {
        if($('.dropdown').hasClass('active')) {
            if(!$('.dropdown').has(e.target).length){
                $('.dropdown').removeClass('active');
            }
        }
    });
}

function priodDate(){
    $('.priod').each(function(){
        if($(this).find('.from').length > 0 && $(this).find('.to').length > 0) {
            var from = $(this).find('.from').children('input').datepicker({
                    changeMonth: true,
                    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                    monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
                    monthNamesShort : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
                    showOtherMonths: true,
    
                    selectOtherMonths: true,
            }).on( "change", function() {
                to.datepicker( "option", "minDate", getDate( this ) );
                from.datepicker( "option", "dateFormat", "yy.mm.dd");
            }),
                to = $( "#dateTo" ).datepicker({
                    changeMonth: true,
                    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                    monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
                    monthNamesShort : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
                    showOtherMonths: true,
                    selectOtherMonths: true,
            }).on( "change", function() {
                from.datepicker( "option", "maxDate", getDate( this ) );
                to.datepicker( "option", "dateFormat", "yy.mm.dd");
            });
        }

        
        if($(this).find('.one-form').length > 0){
            let datepicker
            $(this).find('.one-form').find('.picker').datepicker({
                dateFormat: "yy.mm.dd",
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                numberOfMonths: 2,
                defaultDate: 2,
                stepMonths: 2,
                todayHighlight: false,
                beforeShow: function (input, inst) {
                    var rect = input.getBoundingClientRect();
                    setTimeout(function () {
                        inst.dpDiv.css({ top: rect.top + 40, left: rect.left + 0 });
                    }, 0);
                    datepicker = inst.dpDiv
                },
                beforeShowDay: function(date) {
                    var date1 = $.datepicker.parseDate('yy.mm.dd', $(".date01").val());
                    var date2 = $.datepicker.parseDate('yy.mm.dd', $(".date02").val());
                    var isHighlight = date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2));
                    periodStyle($(".date01").val().split('.')[1]);
                    periodStyle($(".date02").val().split('.')[1]);
                    // periodStyle($.datepicker.formatDate('mm', $(this).datepicker("getDate")));
                    return [true, isHighlight ? "period-day" : ""];
                },
                onSelect: function(dateText, inst) {
                    var date1 = $(".date01").val();
                    var date2 = $(".date02").val();
                    var selectedDate = dateText;
                    if (!date1 || date2) {
                        $(".date01").val(dateText);  
                        $(".date02").val("");
                        $(this).datepicker();
                        $(this).data('datepicker').inline = true;
                        periodStyle($(".date01").val().split('.')[1]);
                        // periodStyle($.datepicker.formatDate('mm', $(this).datepicker("getDate")));
                    } else if (selectedDate < date1) {
                        $(".date02").val($(".date01").val()); 
                        $(".date01").val(dateText);
                        $(this).data('datepicker').inline = true;
                        periodStyle($(".date01").val().split('.')[1]);
                        periodStyle($(".date02").val().split('.')[1]);
                        // periodStyle($.datepicker.formatDate('mm', $(this).datepicker("getDate")));
                    } else {
                        $(".date02").val(dateText);
                        $(this).data('datepicker').inline = true;
                        periodStyle($(".date01").val().split('.')[1]);
                        periodStyle($(".date02").val().split('.')[1]);
                        // periodStyle($.datepicker.formatDate('mm', $(this).datepicker("getDate")));
                    }
                },
                onChangeMonthYear: function(year, month, inst){
                    periodStyle(month);
                },
                onUpdateDatepicker: function(inst, month){
                    $(this).data('datepicker').inline = false;
                    let html = ''
                    html += '<div class="datepicker-foot">'
                    html += '<p class="date-result">'

                    if($(".date01").val() !== '' || $(".date02").val() !== ''){
                        html += $(".date01").val() + '~' + $(".date02").val()
                    } else {
                        html += ''
                    }
                    
                    html += '</p>'
                    html += '<div class="btn-wrap">'
                    html += '<button class="btn md fill-dark w90"><i class="ic-close"></i>닫기</button>'
                    html += '<button class="btn md fill-purple w90"><i class="ic-submit"></i>적용</button>'
                    html += '</div>'
                    html += '</div>'
                    inst.dpDiv.prepend('<p class="txt-warning">* 종료날짜는 시작날짜보다 이전일 수 없습니다.</p>')
                    inst.dpDiv.append(html);

                    $('.ui-datepicker').on('click', '.btn', function() {
                        $('.priod').find('.one-form').find('.picker').datepicker( "hide" );
                    });
                }
            });
            
        }
    });
}

// 원본
// function getElByDate(date, cb){
//     setTimeout(()=>{
//         var result;
//         $('.ui-datepicker table tbody a').each(function(){
//             if(date == $(this).data('date')){
//                 result = $(this).closest('td');
//                 if(cb instanceof Function){
//                     cb(result);
//                 }
//             } 
//         }), 0
//     })

// }

function getElByDate(date, month, cb){
    setTimeout(()=>{
        var result;
        $('.ui-datepicker table tbody a').each(function(){
            if(month - 1 == $(this).closest('td').data('month')){
                if(date == $(this).data('date')){
                    result = $(this).closest('td');
                    if(cb instanceof Function){
                        cb(result);
                    }
                }
            }
        }), 0
    })

}

function periodStyle(month){
    if(month == null){
        return;
    }

    var date1 = $(".date01").val();
    var date2 = $(".date02").val();

    if(Number(date1.split('.')[1]) == month){
        getElByDate(date1.split('.')[2], month, (targetFirst)=>{
            if(targetFirst != null){
                targetFirst.addClass('first');
            }
        });
    }
    
    if(Number(date2.split('.')[1]) == month) {
        getElByDate(date2.split('.')[2], month, (targetLast)=>{
            if(targetLast != null){
                targetLast.addClass('last');
            }
        });
    }
}

function simpleDate(){
    $('.date').each(function(){
        if(!$(this).closest('div').hasClass('.priod')) {
            $(this).datepicker({
                dateFormat: "yy.mm.dd",
                showOtherMonths : true,
                changeMonth: true,
                selectOtherMonths: true,
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
                monthNamesShort : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            })
        }
    })
}

function getDate( element ) {
    var date;
    var dateFormat = "mm/dd/yy"
        
    try {
        date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
        date = null;
    }
    return date;
}

function date(){
    if(!$('[type="text"].date').closest('div').hasClass('.priod')){
        priodDate()
    } else {
        $('[type="text"].date').datepicker({
            changeMonth: true,
        });
    }
    
    simpleDate()
}

// 탭
function tab(){
    $('.tab-wrap').each(function(){
        let thisUse = $(this).data('use'),
            thisNo = $(this).find('.tab-btn.on').index();

        if(thisUse !== false) {
            $(this).children('.tab-cont-wrap').children('.tab-cont').hide()
            $(this).children('.tab-cont-wrap').children('.tab-cont').eq(thisNo).show();
            
            $(this).find('.tab-btn').click(function(){
                thisNo = $(this).index();

                $(this).siblings('.tab-btn').removeClass('on');
                $(this).addClass('on');

                $(this).closest('.tab-wrap').children('.tab-cont-wrap').children('.tab-cont').hide()
                $(this).closest('.tab-wrap').children('.tab-cont-wrap').children('.tab-cont').eq(thisNo).show();
            })

            if($('[data-tab]').length > 0){
                $('[data-tab]').each(function(){
    
                    $(this).click(function(){
                        thisTabNo = $(this).data('tab') - 1;

                        $(this).closest('.tab-wrap').find('.tab-cont').hide()
                        $(this).closest('.tab-wrap').find('.tab-cont').eq(thisTabNo).show();
        
                        $(this).closest('.tab-wrap').find('.tab-btn').removeClass('on');
                        $(this).closest('.tab-wrap').find('.tab-btn').eq(thisTabNo).addClass('on');
                    })
                })
            }
        }
    });
}

// 아코디언탭
function accList(){
    $('.acc-wrap [data-click]').click(function(){
        $(this).closest('.acc-list').toggleClass('on');
        $(this).closest('.acc-list').children('.acc-cont').slideToggle(300);
    });
}

function clickRightBtn(){
    /* 우클릭 이벤트 */
    $(".hidden-btn").on('contextmenu', (event) => {
        event.preventDefault();
        event.stopPropagation();
        $(document).tooltip("disable");
        $(".hidden-btn").find('.btn').remove();

        let thisClass = $(event.target).data('style');
        let thisAct = $(event.target).data('action');
        let thisTxt = $(event.target).data('btn-text');

        if($(event.target).find('button').length <= 0){
            $(event.target).append('<button class="'+ thisClass + '" onclick="' + thisAct +'">'+ thisTxt + '</button>')
        }

        $(event.target).find('button').click(function(){
            $(event.target).find('button').remove();
            
            $(document).tooltip("enable");
        })
    })
}