// import { Get, Param, Query, ValidationPipe, Headers as Head } from '@nestjs/common';
// import { I18n, I18nContext } from 'nestjs-i18n';
//
// import { Headers, MaxGroup, PaginationQueryDto, Public, RelationGroup } from '@common';
// import { ListPageTranslationResponseDto } from './dto';
// import { PageTranslationService } from './translation.service';
// import { PageResponseDto } from '@modules/page/dto';
//
// @Headers('page-translation')
// export class PageTranslationController {
//   constructor(private readonly service: PageTranslationService) {}
//
//   @Public({
//     summary: 'Get List data',
//   })
//   @Get()
//   async findAll(
//     @I18n() i18n: I18nContext,
//     @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
//     @Head() head,
//   ): Promise<ListPageTranslationResponseDto> {
//     const [result, total] = await this.service.findAllByLanguage(head['accept-language']);
//     return {
//       message: i18n.t('common.Get List success'),
//       count: total,
//       data: result,
//     };
//   }
//
//   @Public({
//     summary: 'Get Detail data',
//     serializeOptions: { groups: [MaxGroup, RelationGroup] },
//   })
//   @Get(':slug')
//   async findOne(@I18n() i18n: I18nContext, @Param('slug') slug: string, @Head() head): Promise<PageResponseDto> {
//     return {
//       message: i18n.t('common.Get Detail Success'),
//       data: await this.service.findOneSlug(slug, head['accept-language']),
//     };
//   }
// }
