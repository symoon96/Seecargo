$(document).ready(function(){
    var tutorialSwiper = new Swiper(".tutorial-swiper .swiper", {
        navigation: {
            nextEl: ".tutorial-swiper .swiper-button-next, .tutorial-swiper .swiper-paging-next",
            prevEl: ".tutorial-swiper .swiper-button-prev, .tutorial-swiper .swiper-paging-prev",
        },
        pagination: {
            el: ".tutorial-swiper .paging ul",
            clickable: true,
            renderBullet: function (index, className) {
                return '<li class="' + className + '"><a href="javascript:void(0)">' + (index + 1) + "</a></li>";
            },
        },
        observer: true,
        observeParents: true,
    });
    
    btnFilterAct();
    modifyErrorList();
    scheduleMore();
    mapCate();

    popTabTitle('pop-manage-area');
    listCheckStyle();
    datumDetailListSort();

    $('.work-info .info-basic .btn-option-toggle').click(function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open').addClass('close');
            $(this).closest('.work-info').find('.option-area').slideUp();
        } else {
            $(this).removeClass('close').addClass('open')
            $(this).closest('.work-info').find('.option-area').slideDown();
        }
    });

    $('.map .pin-wrap .detail.v1 .detail-body').mCustomScrollbar({
        axis:"y", // horizontal scrollbar
        advanced:{ 
            updateOnContentResize: true 
        },
    });

    $('.map .pin-wrap .pin.v3').click(function(){
        $(this).closest('.pin-wrap').toggleClass('on')
    });

    let slideLength;

    let cardSwiper = new Swiper('.card-swiper .swiper', {
        navigation: {
            nextEl: ".card-swiper .swiper-button-next",
            prevEl: ".card-swiper .swiper-button-prev",
        },
        slidesPerView: 5, // 20240522 수정
        spaceBetween: 20, // 20240522 수정
        observer: true,
        observeParents: true,
        on: {
            observerUpdate: function(){
                if(this.slides.length == 3) {
                    this.el.offsetParent.style.width = '970px'
                    this.slides.width = "280px"
                    this.params.slidesPerView = 3
                } else if(this.slides.length == 1) {
                    this.el.offsetParent.style.width = '970px'
                    this.slides.width = "280px"
                    this.params.slidesPerView = 1
                }
            }
        }
    });

    /* 20240530 수정 */
    let deliveryCheck2 = new Swiper(".small-photo .swiper", {
        spaceBetween: 5,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
    });
    let deliveryCheck1 = new Swiper(".big-photo .swiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: deliveryCheck2,
        },
        observer: true,
        observeParents: true,
    });
    /* // 20240530 수정 */
    rowFixedTbl()/* 20240522 수정 */
    layerSizeTransform()/* 20240530 수정 */
});

/* 20240530 수정 */
function rowFixedTbl(){
    let target = document.querySelectorAll(".tbl-wrap.fixed");
    let targetParent
    let targetTh
    let thHeight = []
    let thMaxHeight

    if (target.length > 0) {
        target.forEach(function(target) {
            targetParent = target.parentElement;
            targetTh = targetParent.querySelectorAll('th');
        });
    
        targetTh.forEach((targetTh) => {
            thHeight.push(targetTh.clientHeight)
            thMaxHeight = Math.max(...thHeight)
        });
    
        targetTh.forEach((targetTh) => {
            targetTh.style.height = thMaxHeight + 'px'
        });
    }
}
/* // 20240530 수정 */

function btnFilterAct(){
    $('.btn-filter').click(function(){
        $(this).toggleClass('on')
    })
}

function modifyErrorList(){
    $('.list-wrap.v1 table tbody tr td').click(function(){
        if($(this).data('type') !== undefined && $(this).find('input').length <= 0){
            $(this).removeClass('error');
            $(this).removeAttr('data-type');
            if($(this).data('type') == 'date'){
                $(this).html('<input type="text" value="' + $(this).text() + '" class="' + $(this).data('type') + '">')
                $(this).find('.date').datepicker({
                    dateFormat: "mm.dd",
                    changeMonth: true,
                });
            } else {
                $(this).html('<input type="text" value="' + $(this).text() + '" class="' + $(this).data('type') + '">');
            }
        }
    })
}

function scheduleMore() {
    $('.pop-holiday-schedule .schedule-body .week-holiday .holiday.more .btn-calendar-more').click(function(){
        $('.more-holiday').not($(this).siblings('.more-holiday')).hide();

        if($(this).siblings('.more-holiday').css('display') == 'none'){
            $(this).siblings('.more-holiday').show()
        } else {
            $(this).siblings('.more-holiday').hide()
        }
    });
}

function mapCate(){
    $('.popup.full .map .map-category ul li').click(function(){
        $('.popup.full .map .map-category ul li').not($(this)).removeClass('on')
        $(this).addClass('on')
    })
}

function popTabTitle(target){
    let typeNum ;

    typeNum = 0;
    
    $('.'+ target).find('.tab-wrap.v1').find('.tab-btn').click(function(){
        typeNum = $('.'+target).find('.tab-wrap.v1').find('.tab-btn.on').index();

        popTabTitleTextManage(target, typeNum)
    })
}

function popTabTitleTextManage(target, typeNum){
    let title
    let text
    switch (typeNum) {
        case 0:
            title = '지역관리';
            text = '수동 배차에서 사용할 담당 지역, 자동 배차에서 사용할 배송 권역, 운전자 선호지역, 교차금지선을 등록합니다.';
            break;
        case 1:
            title = '담당지역';
            text = '담당지역은 운전자 한명에게 담당할 지역을 등록합니다. 수동 배차에서만 사용됩니다.';
            break;
        case 2:
            title = '권역';
            text = '자동배차는 운전자가 지정한 지역과 선호하는 지역이 겹칠 경우 배정된 지역을 우선적으로 배정합니다.';
            break;
        case 3:
            title = '선호지역';
            text = '자동 배차에서는 운전자가 선호하는 지역이 작을수록 할당된 영역에 포함되고, 클수록 선호하는 지역에 우선 순위가 부여됩니다.';
            break;
        case 4:
            title = '교차금지선';
            text = '교차금지선은 다리, 철도, 고속도로 등 자동 배차 결과 생성 시, 해당 선을 가로지르지 않게 결과를 생성합니다.';
            break;
    
        default:
            break;
    }

    $('.'+ target).children('.pop-head').children('.tit-area').children('.tit').text(title);
    $('.'+ target).children('.pop-head').children('.tit-area').children('.txt').text(text);
}

function listCheckStyle(){
    $('.list-wrap.v5 .list-body .row .check.v5').each(function(){
        if($(this).find('input').is(':checked')){
            $(this).closest('.row').addClass('on')
        }

        
    })

    $('.list-wrap.v5 .list-body .row .check.v5 input').change(function(){
        if($(this).prop('checked')){
            $(this).closest('.row').addClass('on')
        } else {
            $(this).closest('.row').removeClass('on')
        }
    })
}

function viewDatumDetail(e){
    let target = $(e);
    
    target.closest('.datum').siblings('.datum-detail').css({
        'left': target.closest('.datum').outerWidth(),
        'display': 'flex'
    });

    $('.datum .btn-fold.open').show();
    $('.datum .btn-fold.close').hide();
}

/* 20240513 수정 */
function viewDatumResult(e){
    let eventTarget = e
    let el = eventTarget.closest('.pop-body').querySelector('.datum-result')

    el.style.cssText = 'display: flex; left:' + eventTarget.closest('.datum').offsetWidth + 'px'

    eventTarget.closest('.pop-body').querySelector('.btn-fold.open').style.display = 'block'
    eventTarget.closest('.pop-body').querySelector('.btn-fold.close').style.display = 'none'
}
/* // 20240513 수정 */

function hideDatumDetail(e){
    let target = $(e);

    target.closest('.datum-detail').css({
        'left': '',
        'display': ''
    });

    $('.datum .btn-fold.open').hide();
    $('.datum .btn-fold.close').show();
}

/* 20240513 수정 */
function hideDatumResult(e){
    let eventTarget = e
    let el = eventTarget.closest('.datum-result')

    el.style.cssText = '';

    eventTarget.closest('.pop-body').querySelector('.btn-fold.open').style.display = 'none'
    eventTarget.closest('.pop-body').querySelector('.btn-fold.close').style.display = 'block'
}
/* // 20240513 수정 */

function datumDetailListSort(){
    $( ".list-wrap.sortable .list-body" ).sortable({
        items: ".row",
        revert: true,
    });
}

/* 20240530 수정 */
function layerSizeTransform(){
    let btnSize = document.querySelectorAll('.btn-size')

    let itemArr = document.querySelectorAll('.item')
    let sideArr = document.querySelectorAll('.side-area.detail')

    btnSize.forEach(function(e){
        e.addEventListener("click", function(e){
            let thisTarget = e.target
            let hasClass = thisTarget.classList.contains('expansion');
            
            if(hasClass) {
                thisTarget.classList.remove('expansion')
                thisTarget.classList.add('shrink')

                itemArr.forEach(function(number){
                    if(number.querySelector('.btn-size') == thisTarget){
                        if(!number.classList.contains('on')) {
                            number.classList.add('on')
                        }
                    }
                })

                sideArr.forEach(function(number){
                    if(number.querySelector('.btn-size') == thisTarget){
                        if(!number.classList.contains('full')) {
                            number.classList.add('full')
                        }
                    }
                })
            } else if(!hasClass) {
                thisTarget.classList.remove('shrink')
                thisTarget.classList.add('expansion')

                itemArr.forEach(function(number){
                    if(number.querySelector('.btn-size') == thisTarget){
                        if(number.classList.contains('on')) {
                            number.classList.remove('on')
                        }
                    }
                })

                sideArr.forEach(function(number){
                    if(number.querySelector('.btn-size') == thisTarget){
                        if(number.classList.contains('full')) {
                            number.classList.remove('full')
                        }
                    }
                })
            }
        });
    })
}

function foldThis(e){
    let eventTarget = e
    let targetParent = eventTarget.closest('.side-area')
    let classList = targetParent.classList.contains('on');

    if(classList){
        targetParent.classList.remove('on');
        eventTarget.classList.add('close');
        eventTarget.classList.remove('open')
    } else {
        targetParent.classList.add('on');
        eventTarget.classList.add('open')
        eventTarget.classList.remove('close')
    }
}

function viewSideDetail(e){
    let eventTarget = e
    let el = eventTarget.closest('.contents').querySelector('.side-area.detail')
    let $target = eventTarget.closest('.contents').querySelector('.side-area.detail .list-wrap div:not([class*="scroll-"]) table');

    el.style.cssText = 'left:' + eventTarget.closest('.side-area.base').offsetWidth + 'px'
    el.className += ' on';
    
    const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            const thisEl = entry.target
            thisEl.style.cssText = 'transform: translateX(0);'
        });
    });

    observer.observe($target);
}

function sideClose(e){
    let eventTarget = e
    let el = eventTarget.closest('.contents').querySelector('.side-area.detail')

    el.style.cssText = 'left: 0px'
    el.className = 'side-area detail';
    el.querySelector('.btn-size').className = 'btn-ic btn-size expansion';
}
/* // 20240530 수정 */

// function datumDetailListDrop(){
//     $( ".list-wrap.sortable .list-body > div > div" ).sortable({
//         items: ".row",
//         revert: true,
//         sort : function(event, ui) {
//             if(ui.item.closest('.datum-detail').length > 0){
//                 ui.item.closest('[class*="scroll-"]').mCustomScrollbar("disable");
//             }
//         },
//         stop: function(event, ui) {
//             $('.list-wrap.v5 .list-body.scroll-y').mCustomScrollbar({
//                 axis:"y",
//                 advanced:{ 
//                     updateOnContentResize: true 
//                 },
//                 scrollbarPosition: "outside",
//             });

//             ui.item.removeClass('hover')
            
//             if(ui.item.hasClass('ui-draggable') && ui.item.closest('.datum-cont').length > 0){
//                 $(this).find('.ui-draggable').remove()
//             }
//         }
//     });

//     $( ".pop-dispatch-passive .detail-cont .list-wrap.sortable .list-body .row" ).draggable({
//         connectToSortable: ".list-body > div > div",
//         revert: "invalid",
//         drag: function(event, ui){
//             $(ui).css('position', 'fixed')
//             ui.position.left = Math.min(1000, ui.position.left );
//         }
//     });

//     $( ".pop-dispatch-passive .datum-cont .list-wrap.v5 .list-body .row" ).droppable({
//         classes: {
//             "ui-droppable-hover": "hover"
//         },
//         over: function(event, ui){
//             if($(ui).hasClass('ui-droppable')){
//                 $(this).removeClass('hover')
//             }
//         }
//     });
// }