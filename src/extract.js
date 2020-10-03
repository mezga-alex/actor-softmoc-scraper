/* eslint-disable camelcase */
const Apify = require('apify');
const url = require('url');

function toMap(list) {
    const map = new Map();
    for (const item of list) {
        const key = item.id;
        map.set(key, item);
    }

    return map;
}

function extractData(request, html, $) {
    let title = $('.name___1EbZs').text();
    title = title.slice(0,title.length/2)

    let colors = $('.color___3xvLb').text();
    colors = colors.slice(0,colors.length/2)

    let temp_price = $('.gl-price__value').text();
    // Bug with adidas.com (2x strings)
    temp_price = temp_price.slice(0,temp_price.length/2);
    let price = temp_price.replace(/[.,\s\D]/g, '');
    let currency = temp_price.replace(/[.,\s\d+]/g, '');

    const images = [];
    $('.pagination___1IZBh img').each(function () {
        images.push({ src: $(this).attr('src').toString() });
    });

    const now = new Date();
    const results = [];
    const result = {
        url: request.url,
        scrapedAt: now.toISOString(),
        title,
        colors,
        price,
        currency,
        images:images,
        '#debug': Apify.utils.createRequestDebugInfo(request),
    };
    results.push(result);
    return results;
}

module.exports = {
    extractData,
};
