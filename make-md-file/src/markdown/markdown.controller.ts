import { Body, Controller, Post } from '@nestjs/common';
import { MarkdownService } from './markdown.service';

@Controller('markdown')
export class MarkdownController {
  constructor(private readonly markdownService: MarkdownService) {}

  @Post()
  createMarkdown(@Body('subject') subject: string, @Body('text') text: string) {
    return this.markdownService.createMarkdown(subject, text);
  }
}
