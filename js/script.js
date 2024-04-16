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

    let cardSwiper = new Swiper('.card-swiper .swiper', {
        navigation: {
            nextEl: ".card-swiper .swiper-button-next",
            prevEl: ".card-swiper .swiper-button-prev",
        },
        slidesPerView: 3,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
    })
});

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

function hideDatumDetail(e){
    let target = $(e);

    target.closest('.datum-detail').css({
        'left': '',
        'display': ''
    });

    $('.datum .btn-fold.open').hide();
    $('.datum .btn-fold.close').show();
}

function datumDetailListSort(){
    $( ".list-wrap.sortable .list-body" ).sortable({
        items: ".row",
        revert: true,
    });
}

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