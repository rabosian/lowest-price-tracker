let targetId;

$(document).ready(function () {
    // id 가 query 인 녀석 위에서 엔터를 누르면 execSearch() 함수를 실행
    $('#query').on('keypress', function (e) {
        if (e.key == 'Enter') {
            execSearch();
        }
    });
    $('#close').on('click', function () {
        $('#container').removeClass('active');
    })

    $('.nav div.nav-see').on('click', function () {
        $('div.nav-see').addClass('active');
        $('div.nav-search').removeClass('active');

        $('#see-area').show();
        $('#search-area').hide();
    })
    $('.nav div.nav-search').on('click', function () {
        $('div.nav-see').removeClass('active');
        $('div.nav-search').addClass('active');

        $('#see-area').hide();
        $('#search-area').show();
    })

    $('#see-area').show();
    $('#search-area').hide();

    showProduct();
})


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/////////////////////////////////////////////////////////////////////
// execute search
function execSearch() {
    /**
     * search keyword input id: #query
     * search result container: #search-result-box
     * result to HTML: addHTML
     */
    $('#search-result-box').empty();
    // 1. retrieve input #query
    let query = $('#query').val();
    // 2. check if input is null, then alert
    if (query == '') { // null은 안먹힘
        alert("Please enter keyword");
        $('#query').focus();
        return
    }
    // 3. GET /api/search?query=${query} 요청
    $.ajax({
        type: 'GET',
        url: `/api/search?query=${query}`,
        success: function(res) {
            // 4. for 문마다 itemDto를 꺼내서 HTML 만들고 검색결과 목록에 붙이기!
            for (let i=0; i<res.length; i++) {
                let itemDto = res[i];
                let tempHtml = addHTML(itemDto);
                $('#search-result-box').append(tempHtml);
            }
        }
    })

}

function addHTML(itemDto) {
    return `<div class="search-itemDto">
            <div class="search-itemDto-left">
                <img src="${itemDto.image}" alt="">
            </div>
            <div class="search-itemDto-center">
                <div>${itemDto.title}</div>
                <div class="price">
                    ${numberWithCommas(itemDto.lprice)}
                    <span class="unit">Won</span>
                </div>
            </div>
            <div class="search-itemDto-right">                               
                <img src="images/icon-save.png" alt="" onclick='addProduct(${JSON.stringify(itemDto)})'>
            </div>
        </div>`
}

// JSON.stringify -> object to JSON string
function addProduct(itemDto) {
    // 다시 JSON으로 바뀜!!
    // console.log(typeof itemDto); // Object (JSON)
    // console.log(typeof JSON.stringify(itemDto)); // string
    /**
     * modal 뜨게 하는 법: $('#container').addClass('active');
     * data를 ajax로 전달할 때는 두 가지가 매우 중요
     * 1. contentType: "application/json",
     * 2. data: JSON.stringify(itemDto),
     */
    // console.log(typeof itemDto); // Object (JSON)
    // console.log(typeof JSON.stringify(itemDto)); // string
    // 1. POST /api/products 에 관심 상품 생성 요청
    $.ajax({
        type: "POST",
        url: "/api/products",
        contentType: "application/json",
        data: JSON.stringify(itemDto),
        success: function (res) {
            // 2. 응답 함수에서 modal을 뜨게 하고, targetId 를 reponse.id 로 설정
            $('#container').addClass('active');
            targetId = res.id
            console.log(`Result of POST request: ${JSON.stringify(res)}`)
        }
    })
}

function showProduct() {
    /**
     * 관심상품 목록: #product-container
     * 검색결과 목록: #search-result-box
     * 관심상품 HTML 만드는 함수: addProductItem
     */
    // 1. GET /api/products 요청
    $.ajax({
        type: "GET",
        url: "/api/products",
        success: function (res) {
            // 2. 관심상품 목록, 검색결과 목록 비우기
            $('#product-container').empty();
            $('#search-result-box').empty();
            // 3. for 문마다 관심 상품 HTML 만들어서 관심상품 목록에 붙이기!
            for (let i=0; i<res.length; i++) {
                let product = res[i]
                let tempHTML = addProductItem(product)
                $('#product-container').append(tempHTML)
            }
        }
    })

}

function addProductItem(product) {
    console.log(product)
    // link, image, title, lprice, myprice 변수 활용하기
    return `<div class="product-card">
            <div class="card-header">
                <img src="${product.image}" alt="">
            </div>
            <div class="card-body" onclick="window.location.href='${product.link}'">
                <div class="title">
                    ${product.title}
                </div>
                <div class="lprice">
                    <span>${numberWithCommas(product.lprice)}</span>원
                </div>
            </div>
            <div class="card-footer">
                <div class="delete-button">
                    <img src="images/delete.png" width="30" height="30" alt="deleteBtn" onclick='deleteProduct(${product.id})'>
                </div>
                <div class="isgood ${product.lprice <= product.myprice ? '' : 'none'}">
                 LOWEST!
                </div>
            </div>
        </div>`;
}

function setMyprice() {
    /**
     * 숙제! myprice 값 설정하기.
     * 1. id가 myprice 인 input 태그에서 값을 가져온다.
     * 2. 만약 값을 입력하지 않았으면 alert를 띄우고 중단한다.
     * 3. PUT /api/product/${targetId} 에 data를 전달한다.
     *    주의) contentType: "application/json",
     *         data: JSON.stringify({myprice: myprice}),
     *         빠뜨리지 말 것!
     * 4. 모달을 종료한다. $('#container').removeClass('active');
     * 5, 성공적으로 등록되었음을 알리는 alert를 띄운다.
     * 6. 창을 새로고침한다. window.location.reload();
     */
    let myprice = $('#myprice').val();
    if (myprice == '') {
        alert("Please enter price value");
        $('#myprice').focus();
        return
    }

    $.ajax({
        type: "PUT",
        url: `/api/products/${targetId}`,
        contentType: "application/json",
        data: JSON.stringify({ myprice: myprice}),
        success: function (res) {
            $('#container').removeClass('active');
            alert("Successfully add myprice");
            window.location.reload();
        }
    })
}

function deleteProduct(id) {
    if (confirm("Delete this product?") == true) {
        $.ajax({
            type: "DELETE",
            url: `/api/products/${id}`,
            success: function(res) {
                alert('Delete success')
                window.location.reload()
            }
        })
    }


}