<template>
  <img
    v-if="country"
    class="flag"
    :class="{ rounded: rounded }"
    :src="flagSrc"
  />
</template>

<script lang="ts">
export default {
  name: 'FlagComponent',
  props: {
    country: {
      type: String as PropType<FlagCountry>,
      required: true,
    },
    rounded: {
      type: Boolean,
      required: false,
    },
  },
  setup(props) {
    return {
      flagSrc: computed(
        () =>
          `https://aiclientportalprod.blob.core.windows.net/clientportal/static/flags/${props.country?.toLowerCase()}.svg`,
      ),
    }
  },
}

export const flagOptions: FlagCountry[] = [
  'nl',
  'mn',
  'za',
  'ua',
  'ie',
  'gi',
  'et',
  'lu',
  'au',
  'vg',
  'nl',
  'co',
  'tz',
  'it',
  'ao',
  'lv',
  'cefta',
  'km',
  'er',
  'dm',
  'mv',
  'sk',
  'sl',
  'iq',
  'to',
  'es-ga',
  'tg',
  'um',
  'es-pv',
  'ss',
  'pr',
  'rs',
  'gu',
  'cl',
  'ne',
  'hn',
  'pl',
  'cf',
  'bd',
  'ta',
  'ki',
  'uz',
  'xk',
  'ea',
  'sr',
  'ci',
  'io',
  'rw',
  'cz',
  'kg',
  'qa',
  'ws',
  'bw',
  'eh',
  'gy',
  'cy',
  'se',
  'id',
  'tv',
  'bg',
  'sa',
  'ic',
  'bz',
  'gg',
  'un',
  'bo',
  'bl',
  'lk',
  'uy',
  'sb',
  'zm',
  'sc',
  'dg',
  'ke',
  'cx',
  'kr',
  'cn',
  'tn',
  'ni',
  'eg',
  'vc',
  'st',
  'pe',
  'ls',
  'ba',
  'td',
  'sj',
  'aq',
  'br',
  'sg',
  'mp',
  'bf',
  'mf',
  'mr',
  'gf',
  'dk',
  'lc',
  'al',
  'li',
  'gp',
  'gb',
  'xx',
  'bn',
  'mq',
  'cg',
  'gb-eng',
  'am',
  'nz',
  'ga',
  'ca',
  'mm',
  'gb-wls',
  'ar',
  'pw',
  'va',
  'nc',
  'cu',
  'gs',
  'ax',
  'tj',
  'mt',
  're',
  'bh',
  'dz',
  'es-ct',
  'fj',
  'no',
  'bb',
  'ky',
  've',
  'pa',
  'tf',
  'ly',
  'gm',
  'nr',
  'gb-nir',
  'me',
  'by',
  'ae',
  'fm',
  'gh',
  'hu',
  'pm',
  'mh',
  'lr',
  'mw',
  'ir',
  'lb',
  'hm',
  'so',
  'gt',
  'cd',
  'np',
  'ec',
  'be',
  'ai',
  'as',
  'hr',
  'tw',
  'aw',
  'sn',
  'ro',
  'ps',
  'bv',
  'py',
  'af',
  'bj',
  'la',
  'cm',
  'pg',
  'om',
  'us',
  'fk',
  'si',
  'az',
  'my',
  'ru',
  'ug',
  'in',
  'lt',
  'ht',
  'vn',
  'ac',
  'tr',
  'kn',
  'gr',
  'kh',
  'ch',
  'is',
  'md',
  'ph',
  'fr',
  'pk',
  'bt',
  'tc',
  'cp',
  'sd',
  'ma',
  'ng',
  'jm',
  'sv',
  'vi',
  'im',
  'cc',
  'bs',
  'sy',
  'sh',
  'bm',
  'nf',
  'ml',
  'pf',
  'na',
  'at',
  'zw',
  'mx',
  'mg',
  'sx',
  'kz',
  'kp',
  'mo',
  'gq',
  'il',
  'ee',
  'dj',
  'cr',
  'do',
  'gd',
  'fi',
  'cv',
  'kw',
  'nu',
  'ad',
  'gb-sct',
  'yt',
  'ye',
  'th',
  'pn',
  'je',
  'sz',
  'ge',
  'jo',
  'wf',
  'tt',
  'tl',
  'ms',
  'hk',
  'pt',
  'gn',
  'gl',
  'bi',
  'mk',
  'bq',
  'de',
  'vu',
  'fo',
  'es',
  'ag',
  'mz',
  'sm',
  'mu',
  'tm',
  'tk',
  'jp',
  'ck',
  'cw',
  'eu',
  'mc',
  'gw',
]

export type FlagCountry =
  | 'en'
  | 'nl'
  | 'mn'
  | 'za'
  | 'ua'
  | 'ie'
  | 'gi'
  | 'et'
  | 'lu'
  | 'au'
  | 'vg'
  | 'nl'
  | 'co'
  | 'tz'
  | 'it'
  | 'ao'
  | 'lv'
  | 'cefta'
  | 'km'
  | 'er'
  | 'dm'
  | 'mv'
  | 'sk'
  | 'sl'
  | 'iq'
  | 'to'
  | 'es-ga'
  | 'tg'
  | 'um'
  | 'es-pv'
  | 'ss'
  | 'pr'
  | 'rs'
  | 'gu'
  | 'cl'
  | 'ne'
  | 'hn'
  | 'pl'
  | 'cf'
  | 'bd'
  | 'ta'
  | 'ki'
  | 'uz'
  | 'xk'
  | 'ea'
  | 'sr'
  | 'ci'
  | 'io'
  | 'rw'
  | 'cz'
  | 'kg'
  | 'qa'
  | 'ws'
  | 'bw'
  | 'eh'
  | 'gy'
  | 'cy'
  | 'se'
  | 'id'
  | 'tv'
  | 'bg'
  | 'sa'
  | 'ic'
  | 'bz'
  | 'gg'
  | 'un'
  | 'bo'
  | 'bl'
  | 'lk'
  | 'uy'
  | 'sb'
  | 'zm'
  | 'sc'
  | 'dg'
  | 'ke'
  | 'cx'
  | 'kr'
  | 'cn'
  | 'tn'
  | 'ni'
  | 'eg'
  | 'vc'
  | 'st'
  | 'pe'
  | 'ls'
  | 'ba'
  | 'td'
  | 'sj'
  | 'aq'
  | 'br'
  | 'sg'
  | 'mp'
  | 'bf'
  | 'mf'
  | 'mr'
  | 'gf'
  | 'dk'
  | 'lc'
  | 'al'
  | 'li'
  | 'gp'
  | 'gb'
  | 'xx'
  | 'bn'
  | 'mq'
  | 'cg'
  | 'gb-eng'
  | 'am'
  | 'nz'
  | 'ga'
  | 'ca'
  | 'mm'
  | 'gb-wls'
  | 'ar'
  | 'pw'
  | 'va'
  | 'nc'
  | 'cu'
  | 'gs'
  | 'ax'
  | 'tj'
  | 'mt'
  | 're'
  | 'bh'
  | 'dz'
  | 'es-ct'
  | 'fj'
  | 'no'
  | 'bb'
  | 'ky'
  | 've'
  | 'pa'
  | 'tf'
  | 'ly'
  | 'gm'
  | 'nr'
  | 'gb-nir'
  | 'me'
  | 'by'
  | 'ae'
  | 'fm'
  | 'gh'
  | 'hu'
  | 'pm'
  | 'mh'
  | 'lr'
  | 'mw'
  | 'ir'
  | 'lb'
  | 'hm'
  | 'so'
  | 'gt'
  | 'cd'
  | 'np'
  | 'ec'
  | 'be'
  | 'ai'
  | 'as'
  | 'hr'
  | 'tw'
  | 'aw'
  | 'sn'
  | 'ro'
  | 'ps'
  | 'bv'
  | 'py'
  | 'af'
  | 'bj'
  | 'la'
  | 'cm'
  | 'pg'
  | 'om'
  | 'us'
  | 'fk'
  | 'si'
  | 'az'
  | 'my'
  | 'ru'
  | 'ug'
  | 'in'
  | 'lt'
  | 'ht'
  | 'vn'
  | 'ac'
  | 'tr'
  | 'kn'
  | 'gr'
  | 'kh'
  | 'ch'
  | 'is'
  | 'md'
  | 'ph'
  | 'fr'
  | 'pk'
  | 'bt'
  | 'tc'
  | 'cp'
  | 'sd'
  | 'ma'
  | 'ng'
  | 'jm'
  | 'sv'
  | 'vi'
  | 'im'
  | 'cc'
  | 'bs'
  | 'sy'
  | 'sh'
  | 'bm'
  | 'nf'
  | 'ml'
  | 'pf'
  | 'na'
  | 'at'
  | 'zw'
  | 'mx'
  | 'mg'
  | 'sx'
  | 'kz'
  | 'kp'
  | 'mo'
  | 'gq'
  | 'il'
  | 'ee'
  | 'dj'
  | 'cr'
  | 'do'
  | 'gd'
  | 'fi'
  | 'cv'
  | 'kw'
  | 'nu'
  | 'ad'
  | 'gb-sct'
  | 'yt'
  | 'ye'
  | 'th'
  | 'pn'
  | 'je'
  | 'sz'
  | 'ge'
  | 'jo'
  | 'wf'
  | 'tt'
  | 'tl'
  | 'ms'
  | 'hk'
  | 'pt'
  | 'gn'
  | 'gl'
  | 'bi'
  | 'mk'
  | 'bq'
  | 'de'
  | 'vu'
  | 'fo'
  | 'es'
  | 'ag'
  | 'mz'
  | 'sm'
  | 'mu'
  | 'tm'
  | 'tk'
  | 'jp'
  | 'ck'
  | 'cw'
  | 'eu'
  | 'mc'
  | 'gw'
</script>
<style lang="scss" scoped>
.flag {
  height: 1.2rem;
}
.rounded {
  width: 1.2rem;
  object-fit: cover;
  border-radius: 5rem;
}
</style>
