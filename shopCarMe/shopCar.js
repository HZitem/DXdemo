//函数内的type，是判断当前是选中还是没选中

function GoodsTotalPrice(obj,number){   //商品总价
    var Par = obj.parents('.in-box');
    var price = Par.find('.one-price span').text();
    var computed =  parseFloat(price)*number
    Par.find('.total-price span').text(computed.toFixed(2))
}

function AllSelect (type,group) {   //多选
    if(!type){  //选中
        group.find('.radiu-icon').removeClass('active');
    }else{
        group.find('.radiu-icon').addClass('active');
    }
}

function AllGoodsTotal(type){  //所有商品总价
    var lastPrice = 0;
    var active = $('.radiu-icon').filter('.active');    //几个选中的商品，暂时忽略全选按钮
    for (let i = 0; i < active.length; i++) {
        var add =  active.eq(i).parents('.in-box').find('.total-price span').text();
        lastPrice+=parseInt($.trim(add))
    }
    $('.last-total-price').text(lastPrice.toFixed(2))
}

$('.radiu-icon').click(function(){
    var bool = $(this).hasClass('active');
    if(bool){
        $(this).removeClass('active');
    }else{
        $(this).addClass('active');
    }
    AllGoodsTotal(!bool);
})

$('.total-radiu-icon').click(function(){
    var bool = $(this).hasClass('active');
    var Par = $(this).parents('.total-in-action');
    if(bool){
        $(this).removeClass('active');
    }else{
        $(this).addClass('active');
    }
    AllSelect(!bool,Par);
    AllGoodsTotal(!bool);
})

$('.number-less').click(function(){
    var bool = $(this).parents('.in-box').find('.radiu-icon').hasClass('active')
    var $input = $(this).siblings('.number-input').find('input');
    var $val = $input.val();
    if($val>0){
        $val = parseInt($val);
        $val--;
        $input.val($val)
    }
    GoodsTotalPrice($(this),$val);
    AllGoodsTotal(bool);
})

$('.number-add').click(function(){
    var bool = $(this).parents('.in-box').find('.radiu-icon').hasClass('active')
    var $input = $(this).siblings('.number-input').find('input');
    var $val = $input.val();
    $val = parseInt($val);
    $val++;
    $input.val($val)
    GoodsTotalPrice($(this),$val);
    AllGoodsTotal(bool);
})

$('.number-input input').blur(function(){
    var bool = $(this).parents('.in-box').find('.radiu-icon').hasClass('active')
    var $val = $(this).val();
    $val = parseInt($val);
    $(this).val($val)
    GoodsTotalPrice($(this),$val);
    AllGoodsTotal(bool);
})