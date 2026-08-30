import test from 'node:test';
import assert from 'node:assert/strict';
import {
    getGeneralEducationFilterCounts,
    getGeneralEducationSeries,
    matchesGeneralEducationFilter,
} from '../src/utils.js';

test('classifies numbered general education categories', () => {
    assert.equal(getGeneralEducationSeries('通识核心课II'), '二');
    assert.equal(getGeneralEducationSeries('通选课IV'), '四');
});

test('separates unnumbered and non-general categories', () => {
    assert.equal(getGeneralEducationSeries('通选课'), '未区分');
    assert.equal(getGeneralEducationSeries('专业必修课'), null);
});

test('matches only its requested filter', () => {
    assert.equal(matchesGeneralEducationFilter('通识核心课III', 'allTsk'), true);
    assert.equal(matchesGeneralEducationFilter('通识核心课III', '三'), true);
    assert.equal(matchesGeneralEducationFilter('通识核心课III', '二'), false);
    assert.equal(matchesGeneralEducationFilter('专业必修课', 'all'), true);
});

test('counts all filter categories for the current course page', () => {
    assert.deepEqual(getGeneralEducationFilterCounts(['专业必修课', '通识核心课I', '通选课IV', '通选课']), {
        all: 4,
        allTsk: 3,
        一: 1,
        二: 0,
        三: 0,
        四: 1,
        未区分: 1,
    });
});
