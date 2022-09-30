import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify',
})
export class SlugifyPipe implements PipeTransform {
  transform(input: string): string {
    var item: { [key: string]: string };

    item = {
      áÁ: 'a',
      éÉ: 'e',
      íÍ: 'i',
      óÓ: 'o',
      úÚ: 'u',
      ñÑ: 'n',
    };
    for (const key of Object.keys(item)) {
      input = input.replace(new RegExp('[' + key + ']', 'g'), item[key]);
    }
    return input
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
}
