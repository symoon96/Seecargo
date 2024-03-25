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
    listCheckStyle()
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