/**
* --------------------------------
* SERVEQ JS
* --------------------------------
*/

/* COMMON */

// SUB 로케이션
$('#path div[class^="path"]').click(function(){
    $(this).toggleClass('on');
});

// FOOTER 패밀리사이트
$('#footer .family').click(function(){
    $(this).toggleClass('on');
});

// HEADER 검색
$('#header .menu_search, #search ~ .dimd').click(function(e){
    e.preventDefault();
    $('#search').toggleClass('on');
    $('#search').siblings('.menu_search').toggleClass('on');
});

// 앵커이동 X
$('a[href="#"]').click(function(e){
    e.preventDefault();
});

// SELECT
$('select').selectmenu();

// 말줄임처리
fn.ellipsis('.ellipsis');

// 탭메뉴
$('.tab_menu a').click(function(e){
    fn.tabMenu(e, this);
});

if ($('#path')) {

}


$(window).scroll(function(){
    var wScrollTop = $(this).scrollTop();
    var wScrollLeft = $(this).scrollLeft();

    // $('#header .inner').css({'transform':'matrix(1, 0, 0, 1, '+(0-wScrollLeft)+', 0)'});

    // MAIN HEADER 스크롤
    if (wScrollTop > 0) {
        $('.main').addClass('scroll');
    } else {
        $('.main').removeClass('scroll');
    }

    // FOOTER 탑 스크롤
    if(wScrollTop > 0){
        $('#footer').addClass('on');
    }else{
        $('#footer').removeClass('on');
    }
});


/* MAIN */
if ($('body').hasClass('main')) {
    // 메인 비주얼
    var visualLen = $('.visual').length;
    var visualNum = 1;

    for (visualNum; visualNum <= visualLen; visualNum++) {
        var pagination = '<span>'+visualNum+'</span>';
        $('.pagination').append(pagination);
    }

    var visual = function(direction){
        switch (direction) {
            case 'next' :
                if (!$('.visual:last-child').hasClass('show')) {
                    $('.show').next().addClass('show');
                    $('.show').prev().removeClass('show');
                } else {
                    $('.visual:first-child').addClass('show');
                    $('.visual:last-child').removeClass('show');
                }
            break;

            case 'prev' :
                if (!$('.visual:first-child').hasClass('show')) {
                    $('.show').prev().addClass('show');
                    $('.show').next().removeClass('show');
                } else {
                    $('.visual:first-child').removeClass('show');
                    $('.visual:last-child').addClass('show');
                }
            break;

            default :
                $('.visual').removeClass('show');
                $('.visual:nth-child('+direction+')').addClass('show');

            break;
        }

        var showNum = $('.show').index()+1;
        $('.pagination span').removeClass('active');
        $('.pagination span:nth-child('+showNum+')').addClass('active');

        clearInterval(visualInterval);
        visualInterval = setInterval(function(){
            visual('next');
        }, 6000);
    };

    $('.visual').removeClass('first loading');
    $('.visual:first-child').addClass('show');
    $('.pagination span:first-child').addClass('active');

    $('.btn_next').click(function(){
        visual('next');
    });

    $('.btn_prev').click(function(){
        visual('prev');
    });

    $('.pagination span').click(function(){
        visual($(this).index()+1);
    });

    var visualInterval = setInterval(function(){
        visual('next');
    }, 8000);

    // 메인 세미나
    fn.slide('.seminar_list_wrap',{
        btnPrev : '.btn_prev',
        btnNext : '.btn_next',
        margin : '0'
    });

    // 메인 레시피
    fn.slide('.recipe_list_wrap',{
        btnPrev : '.btn_prev',
        btnNext : '.btn_next',
        margin : '65px'
    });

    // 매거진
    $(document).ready(function(){
        var $grid =	$('.bbs_masonry_list .result_list').masonry({
              itemSelector: '.result_list > li',
              columnWidth: 280,
              gutter: 20
            });
    });

}

/* SUB */
if ($('body').hasClass('sub')) {
    var pathT = $('#path').offset().top;

    $(window).scroll(function(){
        var wScrollTop = $(this).scrollTop();
        var wScrollLeft = $(this).scrollLeft();

        // SUB HEADER 스크롤
        if (wScrollTop > pathT) {
            $('.sub').addClass('scroll');
        } else {
            $('.sub').removeClass('scroll');
        }
    });
}

var path1 = $('#wrap').attr('class'),
    path2 = $('#contents').attr('class');

switch (path1) {
    // 상품안내
    case 'product' :

        switch (path2) {
            //글로벌 구매 네트워크
            case 'global' :
                $('.continent_list li a').click(function(e){
                    e.preventDefault();
                });
            break;
        }

    break;

    // 고객지원서비스
    case 'service' :

        switch (path2) {
            // 레시피
            case 'recipe' :
                // 슬라이드
                fn.slide('.product_area',{
                    btnPrev : '.btn_prev',
                    btnNext : '.btn_next',
                    margin : '71px'
                });

                // 프린트
                var infoAreaImg = $('.info_area .img').clone();
            	var infoAreaTit = $('.info_area .tit').clone();
            	var tabContents = $('.tab_contents').clone();
            	var useArea = $('.use_area').clone();

            	$('.btn_print').click(function(){
                    $('#header, #wrap, #footer, .btn_print').addClass('no_print');
            		$('.print_contents').empty();
                    $('.print_contents').append('<div class="info_area"></div>');
                    $('.print_contents div').append(infoAreaTit, infoAreaImg);
            		$('.print_contents').append(tabContents, useArea);
            		$('.print_contents .product_area button').remove();
            		$('#print').addClass('show');
            	});

            	$('#print .btn_close').click(function(){
                    $('#header, #wrap, #footer, .btn_print').removeClass('no_print');
            		$('#print').removeClass('show');
            	});
            break;

            // 세미나
            case 'seminar' :
                // 슬라이드
                // fn.slide('.schedule_area',{
                //     btnPrev : '.btn_prev',
                //     btnNext : '.btn_next',
                //     pagination: '.btn_area',
                //     margin : '0px'
                // });

                // 세미나 리스트 열기 / 닫기
                $('.schedule_list').each(function(){
                    console.log(1)
                    $(this).css({'width':$(this).children('li').outerWidth()*$(this).children('li').length});
                });
                $('.btn_more').click(function(){

                    if (!$(this).parents('td').hasClass('open')) {
                        $('td').removeClass('open');
                        $('td').children('.schedule_area').css({'width':'100%'});
                        $(this).parents('td').addClass('open');
                        $(this).parents('.schedule_area').css({'width':$(this).siblings('.inner').find('li').outerWidth()*$(this).siblings('.inner').find('li').length});
                    } else {
                        $(this).parents('td').removeClass('open');
                        $(this).parents('.schedule_area').css({'width':'100%'});
                    }
                });
            break;

            // 원가계산기
            case 'calculator' :
                // 계산기 STEP3 전체선택
                $('.btn_allchk').click(function(){
                    $('input[type=checkbox]').prop('checked', true);
                });

                // 프린트
                var ingredientsTable = $('.ingredients_table').clone();
            	var outputArea = $('.output_area').clone();

            	$('#print_naming_alert .btn_ok').click(function(){
                    var infoAreaTit = $('#print_naming_alert input').val();

                    $('#header, #wrap, #footer, .btn_print').addClass('no_print');
            		$('.print_contents').empty();
                    $('.print_contents').append('<div class="info_area"></div>');
                    $('.print_contents div').append('<h3 class="tit">'+infoAreaTit+'</h3>');
                    $('.print_contents div').append(ingredientsTable, outputArea);
            		$('.print_contents .product_area button').remove();
            		$('#print').addClass('show');
            	});

            	$('#print .btn_close').click(function(){
                    $('#header, #wrap, #footer, .btn_print').removeClass('no_print');
            		$('#print').removeClass('show');
            	});

                // 내가선택한 재료 열기/닫기
                $('.choose_area .ea').click(function(){
            		$('.choose_area').toggleClass('open');
            	});

                // 재료 직접 추가
                $('.btn_add').click(function(){
                    if ($('.input_wrap input').val() !== '') {
                        $('.input_wrap').addClass('add');
                        setTimeout(function(){
                            $('.input_wrap').removeClass('add');
                        }, 1000);
                    } else {
                        fn.alertOpen('#add_alert');
                    }
                });
            break;


        }

    break;

    // 홍보센터
    case 'pr' :

        switch (path2) {
            //글로벌 구매 네트워크
            case 'event' :
                fn.reply('.reply_box');
            break;
        }

    break;

    // 고객센터
    case 'customer' :

        switch (path2) {
            //문의 등록
            case 'qna_edit' :
                fn.upload('.upload');
            break;
        }

    break;
}
