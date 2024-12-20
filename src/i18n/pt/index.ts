/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const pt = {
  // TODO: Insira suas traduções aqui
  command: 'Exportar como imagem',
  noActiveFile: 'Por favor, abra um artigo primeiro!',
  imageExportPreview: 'Pré-visualização da Exportação de Imagem',
  copiedSuccess: 'Copiado para a área de transferência',
  copy: 'Copiar para a área de transferência',
  copyFail: 'Falha ao copiar',
  notAllowCopy: 'Não é possível copiar diretamente o formato {format}',
  save: 'Salvar Imagem',
  saveSuccess: 'Imagem exportada e salva como {filePath: string}.',
  saveFail: 'Falha ao salvar a imagem',
  saveVault: 'Salvar no Cofre',
  includingFilename: 'Incluindo o Nome do Arquivo Como Título',
  imageWidth: 'Largura da Imagem',
  exportImage: 'Exportar para imagem',
  exportSelectionImage: 'Exportar seleção para imagem',
  exportFolder: 'Exportar todas as notas para imagem',
  invalidWidth: 'Por favor, defina a largura com um número razoável.',
  '2x': 'Ativar imagem com resolução 2x',
  moreSetting:
    'Configurações mais detalhadas podem ser encontradas nas configurações do plugin `Exportar Imagem`.',
  guide: 'Arraste para mover, role ou belisque para ampliar/reduzir, clique duas vezes para redefinir.',
  copyNotAllowed: 'formato pdf não é suportado para cópia',
  exportAll: 'Exportar Notas Selecionadas',
  noMarkdownFile: 'Nenhum arquivo markdown no diretório atual',
  selectAll: 'Selecionar Tudo',
  setting: {
    title: 'Exportar Imagem',
    imageWidth: {
      label: 'Largura padrão da imagem exportada',
      description:
        'Defina a largura da imagem exportada em pixels. O padrão é 640px.',
    },
    filename: {
      label: 'Incluir nome do arquivo como título',
      description:
        'Defina se o nome do arquivo deve ser incluído como título. Quando o Obsidian exibe o documento, ele mostra o nome do arquivo como um título h1. Às vezes, isso não é desejado e você terá títulos duplicados.',
    },
    '2x': {
      label: 'Ativar imagem com resolução 2x',
      description:
        'Defina se a imagem com resolução 2x deve ser ativada. Imagens com resolução 2x parecerão mais nítidas e fornecerão uma melhor experiência em telas de alta PPI, como as de smartphones. No entanto, o lado negativo é que o tamanho do arquivo das imagens é maior.',
    },
    metadata: {
      label: 'Mostrar metadados',
    },
    format: {
      title: 'Formato do arquivo de saída',
      description:
        'Imagens no formato PNG padrão devem satisfazer a maioria das necessidades, mas para apoiar melhor os cenários dos usuários: 1. Suporte para exportação de imagens com fundos normais e transparentes; 2. Suporte para exportar imagens em formato JPG para alcançar tamanhos de arquivo menores, embora possa não ser possível copiá-las diretamente para a área de transferência; 3. Suporte para exportar para formato PDF de uma única página, que difere dos formatos de papel PDF usuais, por favor, tenha cuidado para não usar de maneira errada.',
      png0: '.png - padrão',
      png1: '.png - imagem com fundo transparente',
      jpg: '.jpg - imagem em formato jpg',
      pdf: '.pdf - PDF de uma única página',
    },
    quickExportSelection: {
      label: 'Exportar seleção rápida',
      description: 'Se ativado, o processo de configuração será ignorado ao exportar notas selecionadas, e a imagem exportada será copiada diretamente para a área de transferência.',
    },
    userInfo: {
      title: 'Informação do Autor',
      show: 'Mostrar informação do autor',
      avatar: {
        title: 'Avatar',
        description: 'Recomenda-se usar imagens quadradas',
      },
      name: 'Nome do autor',
      position: 'Onde exibir',
      remark: 'Texto extra',
      align: 'Alinhar',
      removeAvatar: 'Remover avatar',
    },
    watermark: {
      title: 'Marca d\'água',
      enable: {
        label: 'Ativar marca d\'água',
        description:
          'Ativar marca d\'água, suporta marcas d\'água de texto e imagem.',
      },
      type: {
        label: 'Tipo de marca d\'água',
        description: 'Defina o tipo de marca d\'água, texto ou imagem.',
        text: 'Texto',
        image: 'Imagem',
      },
      text: {
        content: 'Conteúdo do texto',
        fontSize: 'Tamanho da fonte da marca d\'água',
        color: 'Cor do texto da marca d\'água',
      },
      image: {
        src: {
          label: 'URL da imagem',
          upload: 'Carregar imagem',
          select: 'Selecionar do Cofre',
        },
      },
      opacity: 'Opacidade da marca d\'água (0 é transparente, 1 é opaco)',
      rotate: 'Rotação da marca d\'água (em graus)',
      width: 'Largura da marca d\'água',
      height: 'Altura da marca d\'água',
      x: 'Espaçamento horizontal da marca d\'água',
      y: 'Espaçamento vertical da marca d\'água',
    },
    preview: 'Pré-visualização da marca d\'água',
    reset: 'Redefinir para o padrão',
    recursive: 'Incluir notas de subdiretórios',
  },
  imageSelect: {
    search: 'Pesquisar',
    select: 'Selecionar',
    cancel: 'Cancelar',
    empty: 'Nenhuma imagem encontrada',
  },
  confirm: 'Confirmar',
  cancel: 'Cancelar',
  imageUrl: 'URL da imagem',
} satisfies BaseTranslation;

export default pt;
