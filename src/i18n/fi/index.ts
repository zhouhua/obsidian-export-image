/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const fi = {
  command: 'Vie kuvana',
  noActiveFile: 'Ole hyvä ja avaa artikkeli ensin!',
  imageExportPreview: 'Kuvan esikatselu',
  copiedSuccess: 'Kopioitu leikepöydälle',
  copy: 'Kopioi leikepöydälle',
  copyFail: 'Kopiointi epäonnistui',
  notAllowCopy: 'Ei voi kopioida suoraan {format} muodossa',
  save: 'Tallenna kuva',
  saveSuccess: 'Kuva on viety ja tallennettu nimellä {filePath: string}.',
  saveFail: 'Kuvan tallennus epäonnistui',
  saveVault: 'Tallenna holviin',
  includingFilename: 'Sisällytä tiedostonimi otsikkona',
  imageWidth: 'Kuvan leveys',
  exportImage: 'Vie kuvaksi',
  exportSelectionImage: 'Vie valinta kuvaksi',
  exportFolder: 'Vie kaikki muistiinpanot kuvaksi',
  invalidWidth: 'Aseta leveys järkevällä numerolla.',
  resolutionMode: 'Käytä korkearesoluutioista kuvaa',
  moreSetting:
    'Tarkemmat asetukset löytyvät `Vie kuva` -laajennuksen asetuksista.',
  guide: 'Raahaa liikuttaaksesi, vieritä tai nipistä zoomataksesi, kaksoisnapsauta nollataksesi.',
  copyNotAllowed: 'pdf-muotoa ei tueta kopiointiin',
  exportAll: 'Vie valitut muistiinpanot',
  noMarkdownFile: 'Nykyisessä hakemistossa ei ole markdown-tiedostoja',
  selectAll: 'Valitse kaikki',
  setting: {
    title: 'Vie kuva',
    imageWidth: {
      label: 'Oletus vietävän kuvan leveys',
      description:
        'Aseta vietävän kuvan leveys pikseleinä. Oletus on 640px.',
    },
    split: {
      title: 'Jaa kuva',
      mode: {
        label: 'Jakotapa',
        description: 'Valitse, jaetaanko kuva ja miten. Kiinteä korkeus tarkoittaa, että jokaisella jaetulla kuvalla on kiinteä korkeus, mikä voi katkaista tekstin jakokohdassa. Vaakaviivan mukaan jakaminen tarkoittaa kuvan jakamista dokumentin vaakaviivan mukaan. Automaattinen jakaminen kappaleittain tarkoittaa kuvan jakamista kappaleittain, varmistaen, että kappale ei jakaannu kahteen kuvaan ja korkeus on mahdollisimman lähellä jakokorkeutta.',
        none: 'Ei jakoa',
        fixed: 'Kiinteä korkeus',
        hr: 'Vaakaviivan mukaan',
        auto: 'Automaattinen kappaleittain',
      },
      height: {
        label: 'Jaetun kuvan korkeus',
        description: 'Aseta kunkin jaetun kuvan korkeus pikseleinä. Oletus on 1000px.',
      },
      overlap: {
        label: 'Jaettujen kuvien päällekkäisyys',
        description: 'Aseta vierekkäisten jaettujen kuvien päällekkäisyys pikseleinä, jotta sisältö ei katkea. Oletus on 40px.',
      },
    },
    filename: {
      label: 'Sisällytä tiedostonimi otsikkona',
      description:
        'Aseta, sisällytetäänkö tiedostonimi otsikkona. Kun Obsidian näyttää asiakirjan, se näyttää tiedostonimen h1-otsikkona. Joskus tämä ei ole toivottua, ja saat kaksoisotsikoita.',
    },
    '2x': {
      label: 'Ota käyttöön 2x-resoluutioinen kuva',
      description:
        'Aseta, otetaanko käyttöön 2x-resoluutioinen kuva. 2x-resoluutioiset kuvat näyttävät terävämmiltä ja tarjoavat paremman kokemuksen korkean PPI:n näytöillä, kuten älypuhelimissa. Kuitenkin haittapuolena on, että kuvatiedostojen koko on suurempi.',
    },
    metadata: {
      label: 'Näytä metadata',
    },
    format: {
      title: 'Tulostiedoston muoto',
      description:
        'Oletus PNG-muotoiset kuvat pitäisi tyydyttää suurimman osan tarpeista, mutta paremman käyttäjätilanteiden tukemiseksi: 1. Tuki kuvien vientiin sekä normaalilla että läpinäkyvällä taustalla; 2. Tuki JPG-kuvien vientiin pienempien tiedostokokojen saavuttamiseksi, vaikka suora kopiointi leikepöydälle ei välttämättä ole mahdollista; 3. Tuki vientiin yksisivuiseen PDF-muotoon, joka eroaa tavallisista PDF-paperimuodoista, ole varovainen äläkä käytä väärin.',
      png0: '.png - oletus',
      png1: '.png - läpinäkyvä tausta',
      jpg: '.jpg - jpg-muotoinen kuva',
      pdf: '.pdf - yksisivuinen pdf',
    },
    quickExportSelection: {
      label: 'Nopea vienti valintaan',
      description: 'Jos käytössä, määritysprosessi ohitetaan valittujen muistiinpanojen viennissä, ja vietävä kuva kopioidaan suoraan leikepöydälle.',
    },
    userInfo: {
      title: 'Tekijän tiedot',
      show: 'Näytä tekijän tiedot',
      avatar: {
        title: 'Avatar',
        description: 'Suositellaan neliömäisten kuvien käyttöä',
      },
      name: 'Tekijän nimi',
      position: 'Missä näytetään',
      remark: 'Lisäteksti',
      align: 'Tasaa',
      removeAvatar: 'Poista avatar',
    },
    watermark: {
      title: 'Vesileima',
      enable: {
        label: 'Ota vesileima käyttöön',
        description:
          'Ota vesileima käyttöön, tukee tekstivesileimaa ja kuvavesileimaa.',
      },
      type: {
        label: 'Vesileiman tyyppi',
        description: 'Aseta vesileiman tyyppi, teksti tai kuva.',
        text: 'Teksti',
        image: 'Kuva',
      },
      text: {
        content: 'Tekstisisältö',
        fontSize: 'Vesileiman fonttikoko',
        color: 'Vesileimatekstin väri',
      },
      image: {
        src: {
          label: 'Kuvan URL',
          upload: 'Lataa kuva',
          select: 'Valitse holvista',
        },
      },
      opacity: 'Vesileiman läpinäkyvyys (0 läpinäkyvä, 1 läpinäkymätön)',
      rotate: 'Vesileiman kierto (asteina)',
      width: 'Vesileiman leveys',
      height: 'Vesileiman korkeus',
      x: 'Vesileiman vaakasuora väli',
      y: 'Vesileiman pystysuora väli',
    },
    preview: 'Vesileiman esikatselu',
    reset: 'Palauta oletusasetukset',
    recursive: 'Sisällytä muistiinpanot alihakemistoista',
  },
  imageSelect: {
    search: 'Hae',
    select: 'Valitse',
    cancel: 'Peruuta',
    empty: 'Kuvia ei löytynyt',
  },
  confirm: 'Vahvista',
  cancel: 'Peruuta',
  imageUrl: 'Syötä URL',
  splitInfo: 'Kuvan kokonaiskorkeus on {rootHeight}px, ja jakokorkeus on {splitHeight}px, joten {pages} kuvaa luodaan',
  splitInfoHr: 'Kuvan kokonaiskorkeus on {rootHeight}px, ja jakokorkeus on {splitHeight}px, joten {pages} kuvaa luodaan',
} satisfies BaseTranslation;

export default fi; 