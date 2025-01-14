/* eslint-disable no-undef */
import chai from 'chai';
import css from '../../utils/CssClass';

const { expect } = chai;

describe('CssClass.have', () => {
    it('css.have(\'a b c\', \'c\')', () => {
        const result = css.have('a b c', 'c');
        const should = true;
        expect(result).to.equal(should);
    });
    it('css.have(\'a b c\', \'c\')', () => {
        const result = css.have('a b c', 'd');
        const should = false;
        expect(result).to.equal(should);
    });
    it('css.have("a b c f"," f")', () => {
        const result = css.have('a b c f', ' f');
        const should = true;
        expect(result).to.equal(should);
    });
});

describe('CssClass.add', () => {
    it('css.add("", "c")', () => {
        const result = css.add('', 'c ');
        const should = 'c';
        expect(result).to.equal(should);
    });
    it('css.add("m", "c")', () => {
        const result = css.add('m', 'c ');
        const should = 'm c';
        expect(result).to.equal(should);
    });
    it('css.add("m a", "c")', () => {
        const result = css.add('m a', 'c ');
        const should = 'm a c';
        expect(result).to.equal(should);
    });
});

describe('CssClass.remove', () => {
    it('css.remove("a c b", "c")', () => {
        const result = css.remove('a c b', 'c');
        const should = 'a b';
        expect(result).to.equal(should);
    });
    it('css.remove("a c b d e", "c","d")', () => {
        const result = css.remove('a c b d e', 'c', 'd');
        const should = 'a b e';
        expect(result).to.equal(should);
    });
    it('css.remove("a b c", "c","a","b")', () => {
        const result = css.remove('a   b  c', 'c', 'a', 'b  ');
        const should = '';
        expect(result).to.equal(should);
    });
});

describe('CssClass.toggle', () => {
    it('css.toggle("a c b", "c")', () => {
        const result = css.toggle('a c b', 'c');
        const should = 'a b';
        expect(result).to.equal(should);
    });
    it('css.toggle("a b", "c")', () => {
        const result = css.toggle('a b', 'c');
        const should = 'a b c';
        expect(result).to.equal(should);
    });
});
