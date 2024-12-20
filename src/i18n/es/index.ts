/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseTranslation } from '../i18n-types';

const es = {
  command: 'Exportar como imagen',
  noActiveFile: '¡Por favor, abre un artículo primero!',
  imageExportPreview: 'Vista previa de exportación de imagen',
  copiedSuccess: 'Copiado al portapapeles',
  copy: 'Copiar al portapapeles',
  copyFail: 'Fallo al copiar',
  notAllowCopy: 'No se permite copiar directamente el formato {format}',
  save: 'Guardar imagen',
  saveSuccess: 'Imagen exportada y guardada como {filePath: string}.',
  saveFail: 'Fallo al guardar la imagen',
  saveVault: 'Guardar en la bóveda',
  includingFilename: 'Incluir nombre de archivo como título',
  imageWidth: 'Ancho de la imagen',
  exportImage: 'Exportar a imagen',
  exportSelectionImage: 'Exportar selección a imagen',
  exportFolder: 'Exportar todas las notas a imagen',
  invalidWidth: 'Por favor, establece un ancho en un número razonable.',
  '2x': 'Activar imagen con resolución 2x',
  moreSetting:
    'Puedes encontrar configuraciones más detalladas en los ajustes del plugin `Exportar como imagen`.',
  guide: 'Arrastra para mover, desplaza o pellizca para acercar/alejar, doble clic para restablecer.',
  copyNotAllowed: 'El formato pdf no es compatible para copiar',
  exportAll: 'Exportar notas seleccionadas',
  noMarkdownFile: 'No hay archivos markdown en el directorio actual',
  selectAll: 'Seleccionar todo',
  setting: {
    title: 'Exportar como imagen',
    imageWidth: {
      label: 'Ancho de imagen exportada por defecto',
      description:
        'Establece el ancho de la imagen exportada en píxeles. El predeterminado es 640px.',
    },
    filename: {
      label: 'Incluir nombre de archivo como título',
      description:
        'Establece si incluir el nombre del archivo como título. Cuando Obsidian muestra el documento, muestra el nombre del archivo como un título h1. A veces esto no es lo que quieres y terminarás con títulos duplicados.',
    },
    '2x': {
      label: 'Activar imagen con resolución 2x',
      description:
        'Establece si activar la imagen con resolución 2x. Las imágenes con resolución 2x aparecerán más nítidas y proporcionarán una mejor experiencia en pantallas de alta PPI, como las de los smartphones. Sin embargo, el lado negativo es que el tamaño del archivo de las imágenes es mayor.',
    },
    metadata: {
      label: 'Mostrar metadatos',
    },
    format: {
      title: 'Formato del archivo de salida',
      description:
        'Las imágenes en formato PNG por defecto deberían satisfacer la mayoría de necesidades, pero para soportar mejor los escenarios de uso: 1. Soporte para exportar imágenes con fondos normales y transparentes; 2. Soporte para exportar imágenes en formato JPG para lograr tamaños de archivo más pequeños, aunque puede que no sea posible copiar directamente al portapapeles; 3. Soporte para exportar al formato de PDF de una sola página, que difiere de los formatos de papel PDF habituales, por favor, ten cuidado de no usarlo incorrectamente.',
      png0: '.png - por defecto',
      png1: '.png - imagen con fondo transparente',
      jpg: '.jpg - imagen en formato jpg',
      pdf: '.pdf - PDF de una sola página',
    },
    quickExportSelection: {
      label: 'Exportar selección rápido',
      description: 'Si está activado, se omite el proceso de configuración al exportar notas seleccionadas, y el archivo exportado se copia directamente al portapapeles.',
    },
    userInfo: {
      title: 'Información del autor',
      show: 'Mostrar información del autor',
      avatar: {
        title: 'Avatar',
        description: 'Se recomienda usar imágenes cuadradas',
      },
      name: 'Nombre del autor',
      position: 'Dónde mostrar',
      remark: 'Texto extra',
      align: 'Alinear',
      removeAvatar: 'Eliminar avatar',
    },
    watermark: {
      title: 'Marca de agua',
      enable: {
        label: 'Activar marca de agua',
        description:
          'Activar la marca de agua, admite marcas de agua de texto e imagen.',
      },
      type: {
        label: 'Tipo de marca de agua',
        description: 'Establece el tipo de marca de agua, texto o imagen.',
        text: 'Texto',
        image: 'Imagen',
      },
      text: {
        content: 'Contenido del texto',
        fontSize: 'Tamaño de fuente de la marca de agua',
        color: 'Color del texto de la marca de agua',
      },
      image: {
        src: {
          label: 'URL de la imagen',
          upload: 'Subir imagen',
          select: 'Seleccionar de la bóveda',
        },
      },
      opacity: 'Opacidad de la marca de agua (0 es transparente, 1 es opaco)',
      rotate: 'Rotación de la marca de agua (en grados)',
      width: 'Ancho de la marca de agua',
      height: 'Altura de la marca de agua',
      x: 'Distancia horizontal de la marca de agua',
      y: 'Distancia vertical de la marca de agua',
    },
    preview: 'Vista previa de la marca de agua',
    reset: 'Restablecer a los valores por defecto',
    recursive: 'Incluir notas de subdirectorios',
  },
  imageSelect: {
    search: 'Buscar',
    select: 'Seleccionar',
    cancel: 'Cancelar',
    empty: 'No se encontraron imágenes',
  },
  confirm: 'Confirmar',
  cancel: 'Cancelar',
  imageUrl: 'URL de la imagen',
} satisfies BaseTranslation;

export default es;
