# Structure Examples

## Example of Table Row Properties

This example assumes that the application has found a table terminating
paragraph mark by following the algorithm in section
[2.4.5](#Section_8eebe8176c3b490d869530c799cc2367), Determining Row
Boundaries, or through some other means such as sequentially retrieving
characters. The application has located the direct paragraph formatting
for this paragraph mark by using the algorithm in section
[2.4.6.1](#Section_61b635c32c444155bf17fec281b30c71), Direct Paragraph
Formatting. The following table shows the first **Prl** ( section
[2.2.5.2](#prl)) of the direct formatting.

| **Offset** | **Size** | **Structure**            | **Value**  |
|------------|----------|--------------------------|------------|
| 00000D05   | 0006     | Prl **- prl**            |            |
| 00000D05   | 0002     | [Sprm](#sprm) **- sprm** |            |
| 00000D05   | 9 bits   | USHORT **- ispmd**       | 0x06B      |
| 00000D05   | 1 bit    | USHORT **- fSpec**       | 0x0        |
| 00000D05   | 3 bits   | USHORT **- sgc**         | 0x1        |
| 00000D05   | 3 bits   | USHORT **- spra**        | 0x3        |
| 00000D07   | 0004     | LONG **- operand**       | 0x00000000 |

Figure 39: The first Prl of the direct formatting

**sprm.ispmd:** If this value is 0x06B and **fSpec** is set to 0x0, this
is [sprmPTableProps](#paragraph-properties).

**sprm.sgc:** A value of 0x1 specifies that **sprm** modifies a
paragraph property.

**sprm.spra:** A value of 0x3 specifies that **operand** is 4 bytes in
size.

**operand:** A value of 0x00000000 specifies the byte offset in the
[Data Stream](#Section_0218f8a661504695965c9abc8a685b81) where a
[**PrcData**](#prcdata) begins.

This example assumes that the application can process sprmPTableProps.
It therefore ignores the rest of the array of **Prl** that contains the
sprmPTableProps and instead processes the **PrcData** at offset zero of
the Data Stream.

The following table shows the **PrcData** at offset zero of the Data
Stream.

| **Offset** | **Size** | **Structure**             | **Value** |
|------------|----------|---------------------------|-----------|
| 00000000   | 004C     | PrcData **- PrcData**     |           |
| 00000000   | 0002     | SHORT **- cbGrpprl**      | 0x004A    |
| 00000002   | 004A     | Array of Prl **- GrpPrl** |           |

Figure 40: A PrcData element that contains table row property modifiers

**cbGrpprl:** A value of 0x004A specifies the size, in bytes, of
**GrpPrl**. Because **Prl** elements are variably sized, this does not
give any information about the number of **Prl** elements that are
contained in **GrpPrl** other than the fact that there is at least one
**Prl** element.

**GrpPrl:** An array of **Prl**, expanded in the following figures.

The following table shows the first **Prl** element that is contained in
**GrpPrl**.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 00000002   | 0003     | Prl **- GrpPrl\[0\]** |           |
| 00000002   | 0002     | Sprm **- sprm**       |           |
| 00000002   | 9 bits   | USHORT **- ispmd**    | 0x016     |
| 00000002   | 1 bit    | USHORT **- fSpec**    | 0x0       |
| 00000002   | 3 bits   | USHORT **- sgc**      | 0x1       |
| 00000002   | 3 bits   | USHORT **- spra**     | 0x1       |
| 00000004   | 0001     | BYTE **- operand**    | 0x01      |

Figure 41: The first Prl in GrpPrl

**sprm.ispmd:** If this value is 0x016 and **fSpec** is set to 0x0, this
is sprmPFInTable.

**sprm.sgc:** A value of 0x1 specifies that **sprm** modifies a
paragraph property.

**sprm.spra:** A value of 0x1 specifies that **operand** is 1 byte in
size.

**operand:** A value of 0x01 specifies that this paragraph is in a
table.

The **GrpPrl\[0\]** element is 3 bytes in size, leaving 0x47 bytes for
the rest of **GrpPrl**.

The following table shows the second **Prl** that is contained in
**GrpPrl**.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 00000005   | 0003     | Prl **- GrpPrl\[1\]** |           |
| 00000005   | 0002     | Sprm **- sprm**       |           |
| 00000005   | 9 bits   | USHORT **- ispmd**    | 0x017     |
| 00000005   | 1 bit    | USHORT **- fSpec**    | 0x0       |
| 00000005   | 3 bits   | USHORT **- sgc**      | 0x1       |
| 00000005   | 3 bits   | USHORT **- spra**     | 0x1       |
| 00000007   | 0001     | BYTE **- operand**    | 0x01      |

Figure 42: The second Prl in GrpPrl

**sprm.ispmd:** If this value is 0x017 and **fSpec** is equal to 0x0,
this is sprmPFTtp.

**sprm.sgc:** A value of 0x1 specifies that this **Sprm** modifies a
paragraph property.

**sprm.spra:** A value of 0x1 specifies that **operand** is one byte in
size.

**operand:** A value of 0x01 specifies that the paragraph mark is a
table terminating paragraph mark. **SprmPFTtp** is only valid at table a
table depth of 1. Nested tables use sprmPFInnerTtp.

The **GrpPrl\[1\]** element is 3 bytes in size, leaving 0x44 bytes for
the rest of the **GrpPrl** element.

The following table shows the third **Prl** element in **GrpPrl**.

| **Offset** | **Size** | **Structure**         | **Value**  |
|------------|----------|-----------------------|------------|
| 00000008   | 0006     | Prl **- GrpPrl\[2\]** |            |
| 00000008   | 0002     | Sprm **- sprm**       |            |
| 00000008   | 9 bits   | USHORT **- ispmd**    | 0x049      |
| 00000008   | 1 bit    | USHORT **- fSpec**    | 0x1        |
| 00000008   | 3 bits   | USHORT **- sgc**      | 0x1        |
| 00000008   | 3 bits   | USHORT **- spra**     | 0x3        |
| 0000000A   | 0004     | LONG **- operand**    | 0x00000001 |

Figure 43: The third Prl in GrpPrl

**sprm.ispmd:** If this value is 0x049 and **fSpec** is set to 0x1, this
is sprmPItap.

**sprm.sgc:** A value of 0x1 specifies that **sprm** modifies a
paragraph property.

**sprm.spra:** A value of 0x3 specifies that **operand** is 4 bytes in
size.

**operand:** A value of 0x00000001 specifies that the table depth of
this table row is 1. This table is not nested in another table.

The **GrpPrl\[2\]** element is 6 bytes in size, leaving 0x3E bytes for
the rest of **GrpPrl**.

The following table shows the fourth **Prl** in **GrpPrl**.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 0000000E   | 0004     | Prl **- GrpPrl\[3\]** |           |
| 0000000E   | 0002     | Sprm **- sprm**       |           |
| 0000000E   | 9 bits   | USHORT **- ispmd**    | 0x001     |
| 0000000E   | 1 bit    | USHORT **- fSpec**    | 0x1       |
| 0000000E   | 3 bits   | USHORT **- sgc**      | 0x5       |
| 0000000E   | 3 bits   | USHORT **- spra**     | 0x4       |
| 00000010   | 0002     | SHORT **- operand**   | 0x0000    |

Figure 44: The fourth Prl in GrpPrl

**sprm.ispmd:** If this value is 0x001 and **fSpec** is set to 0x1, this
is [sprmTDxaLeft](#table-properties).

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x4 specifies that **operand** is two bytes in
size.

**operand:** A value of 0x0000 specifies that the horizontal origin of
the table is the [**logical
left**](#gt_ccc2ab6c-db9b-4c67-9b95-21ce79e7358d) margin. This is
further modified in **GrpPrl\[10\]**.

The **GrpPrl\[3\]** element is 4 bytes in size, leaving 0x3A bytes for
the rest of the **GrpPrl** element.

The following table shows the fifth **Prl** in **GrpPrl**.

| **Offset** | **Size** | **Structure**                                   | **Value** |
|------------|----------|-------------------------------------------------|-----------|
| 00000012   | 0006     | Prl **- GrpPrl\[4\]**                           |           |
| 00000012   | 0002     | Sprm **- sprm**                                 |           |
| 00000012   | 9 bits   | USHORT **- ispmd**                              | 0x021     |
| 00000012   | 1 bit    | USHORT **- fSpec**                              | 0x1       |
| 00000012   | 3 bits   | USHORT **- sgc**                                | 0x5       |
| 00000012   | 3 bits   | USHORT **- spra**                               | 0x3       |
| 00000014   | 0004     | [TInsertOperand](#tinsertoperand) **- operand** |           |
| 00000014   | 0001     | BYTE **- itcFirst**                             | 0x00      |
| 00000015   | 0001     | BYTE **- ctc**                                  | 0x02      |
| 00000016   | 0002     | USHORT **- dxaCol**                             | 0x0168    |

Figure 45: The fifth Prl in GrpPrl

**sprm.ispmd:** If this value is 0x021 and **fSpec** is set to 0x1, this
is sprmTInsert.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x3 specifies that **operand** is 4 bytes in
size.

**operand.itcFirst:** A value of 0x00 specifies the zero-based index of
the first cell definition to be inserted. Because no cells are defined,
0x00 is the only valid value for **itcFirst**.

**operand.ctc:** A value of 0x02 specifies the number of cell
definitions to insert. This row has two cells.

**operand.dxaCol:** A value of 0x0168 specifies that each of the newly
inserted cells is 0x0168
[**twips**](#gt_4b82472c-103d-4eff-a07e-6a0f784e3382) wide.

The **GrpPrl\[4\]** element is 6 bytes in size, leaving 0x34 for the
rest of the **GrpPrl** element.

The following table shows the sixth **Prl** in the **GrpPrl** element.

| **Offset** | **Size** | **Structure**                                                 | **Value** |
|------------|----------|---------------------------------------------------------------|-----------|
| 00000018   | 0008     | Prl **- GrpPrl\[5\]**                                         |           |
| 00000018   | 0002     | Sprm **- sprm**                                               |           |
| 00000018   | 9 bits   | USHORT **- ispmd**                                            | 0x035     |
| 00000018   | 1 bit    | USHORT **- fSpec**                                            | 0x1       |
| 00000018   | 3 bits   | USHORT **- sgc**                                              | 0x5       |
| 00000018   | 3 bits   | USHORT **- spra**                                             | 0x6       |
| 0000001A   | 0006     | [TableCellWidthOperand](#tablecellwidthoperand) **- operand** |           |
| 0000001A   | 0001     | BYTE **- cb**                                                 | 0x05      |
| 0000001B   | 0002     | [ItcFirstLim](#itcfirstlim) **- itc**                         |           |
| 0000001B   | 0001     | SHORT **- itcFirst**                                          | 0x00      |
| 0000001B   | 0001     | SHORT **- itcLim**                                            | 0x01      |
| 0000001D   | 0003     | [FtsWWidth_TablePart](#ftswwidth_tablepart) **- FtsWWidth**   |           |
| 0000001D   | 0001     | [Fts](#fts) **- ftsWidth**                                    | 0x03      |
| 0000001E   | 0002     | SHORT **- wWidth**                                            | 0x114C    |

Figure 46: The sixth Prl in GrpPrl

**sprm.ispmd:** If this value is 0x035 and **fSpec** is set to 0x1, this
is sprmTCellWidth.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x6 specifies that the first byte of
**operand** specifies the size of the rest of **operand**.

**operand.cb:** A value of 0x05 specifies that **operand** is 5 bytes in
size, not including **operand.cb**.

**operand.itc.itcFirst:** A value of 0x0000 specifies the first
zero-based index of the first cell to which **FtsWWidth** applies.

**operand.itc.itcLim:** A value of 0x0001 specifies the zero-based index
of the first cell outside the range of cells to which **FtsWWidth**
applies. **FtsWWidth** thus only applies to the first cell in the row.

**operand.FtsWWidth.ftsWidth:** A value of 0x03 specifies that
**wWidth** is a measurement in twips.

**operand.FtsWWidth.wWidth:** A value of 0x114C specifies the preferred
width of the first cell of the row, in twips.

The **GrpPrl\[5\]** element is 8 bytes in size, leaving 0x2C bytes for
the rest of GrpPrl.

The following table shows the seventh **Prl** element in **GrpPrl**.

| **Offset** | **Size** | **Structure**                       | **Value** |
|------------|----------|-------------------------------------|-----------|
| 00000020   | 0008     | Prl **- GrpPrl\[6\]**               |           |
| 00000020   | 0002     | Sprm **- sprm**                     |           |
| 00000020   | 9 bits   | USHORT **- ispmd**                  | 0x035     |
| 00000020   | 1 bit    | USHORT **- fSpec**                  | 0x1       |
| 00000020   | 3 bits   | USHORT **- sgc**                    | 0x5       |
| 00000020   | 3 bits   | USHORT **- spra**                   | 0x6       |
| 00000022   | 0006     | TableCellWidthOperand **- operand** |           |
| 00000022   | 0001     | BYTE **- cb**                       | 0x05      |
| 00000023   | 0002     | ItcFirstLim **- itc**               |           |
| 00000023   | 0001     | SHORT **- itcFirst**                | 0x01      |
| 00000023   | 0001     | SHORT **- itcLim**                  | 0x02      |
| 00000025   | 0003     | FtsWWidth_TablePart **- FtsWWidth** |           |
| 00000025   | 0001     | Fts **- ftsWidth**                  | 0x03      |
| 00000026   | 0002     | SHORT **- wWidth**                  | 0x114C    |

Figure 47: The seventh Prl in GrpPrl.

**sprm.ispmd:** If this value is 0x035 and **fSpec** is set to 0x0001,
this is sprmTCellWidth.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x6 specifies that the first byte of
**operand** specifies the size of the rest of **operand**.

**operand.cb:** A value of 0x05 specifies that **operand** is 5 bytes in
size, not including **operand.cb**.

**operand.itc.itcFirst:** A value of 0x0001 specifies the first
zero-based index of the first cell to which **FtsWWidth** applies.

**operand.itc.itcLim:** A value of 0x0002 specifies the zero-based index
of the first cell outside the range of cells to which **FtsWWidth**
applies. This means that the **FtsWWidth** value applies only to the
second cell in the row.

**operand.FtsWWidth.ftsWidth:** A value of 0x03 specifies that
**wWidth** is a measurement in twips.

**operand.FtsWWidth.wWidth:** A value of 0x114C specifies the preferred
width of the second cell of the row, in twips.

The **GrpPrl\[6\]** element is 8 bytes in size, leaving 0x24 for the
rest of the **GrpPrl** element.

The following table shows the eighth **Prl** in the **GrpPrl** element.

| **Offset** | **Size** | **Structure**                                   | **Value** |
|------------|----------|-------------------------------------------------|-----------|
| 00000028   | 0006     | Prl **- GrpPrl\[7\]**                           |           |
| 00000028   | 0002     | Sprm **- sprm**                                 |           |
| 00000028   | 9 bits   | USHORT **- ispmd**                              | 0x023     |
| 00000028   | 1 bit    | USHORT **- fSpec**                              | 0x1       |
| 00000028   | 3 bits   | USHORT **- sgc**                                | 0x5       |
| 00000028   | 3 bits   | USHORT **- spra**                               | 0x3       |
| 0000002A   | 0004     | [TDxaColOperand](#tdxacoloperand) **- operand** |           |
| 0000002A   | 0002     | ItcFirstLim **- itc**                           |           |
| 0000002A   | 0001     | SHORT **- itcFirst**                            | 0x00      |
| 0000002A   | 0001     | SHORT **- itcLim**                              | 0x02      |
| 0000002C   | 0002     | SHORT **- dxaCol**                              | 0x114C    |

Figure 48: The eighth Prl in GrpPrl

**sprm.ispmd:** If this value is 0x023 and **fSpec** is set to 0x1, this
is sprmTDxaCol.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x3 specifies that **operand** is 4 bytes in
size.

**operand.itc.itcFirst:** A value of 0x0000 specifies the first
zero-based index of the first cell to which **dxaCol** applies.

**operand.itc.itcLim:** A value of 0x0002 specifies the zero-based index
of the first cell outside the range of cells to which **dxaCol**
applies. This means that the **DxaCol** value applies to both cells in
the row.

**operand.dxaCol:** A value of 0x114C specifies the width of each cell,
in twips. This value overrides the widths that are specified in the
**GrpPrl\[4\]** element.

The **GrpPrl\[7\]** element is 6 bytes in size, leaving 0x1E bytes for
the rest of **GrpPrl**.

The following table shows the ninth **Prl** in the **GrpPrl** element.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 0000002E   | 0004     | Prl **- GrpPrl\[8\]** |           |
| 0000002E   | 0002     | Sprm **- sprm**       |           |
| 0000002E   | 9 bits   | USHORT **- ispmd**    | 0x03A     |
| 0000002E   | 1 bit    | USHORT **- fSpec**    | 0x1       |
| 0000002E   | 3 bits   | USHORT **- sgc**      | 0x5       |
| 0000002E   | 3 bits   | USHORT **- spra**     | 0x2       |
| 00000030   | 0002     | USHORT **- operand**  | 0x000F    |

Figure 49: The ninth Prl in GrpPrl

**sprm.ispmd:** If this value is 0x03A and **fSpec** is set to 0x1, this
is sprmTIstd.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x2 specifies that **operand** is two bytes in
size.

**operand:** A value of 0x000F specifies the **istd** of this table. To
find the properties that are specified by this style, an application
would implement the algorithm from section
[2.4.6.5](#Section_9258b41cff0a4c96a3a9610664dabbeb), Determining
Properties of a Style. This is outside the scope of this example.

The **GrpPrl\[8\]** element is 4 bytes in size, leaving 0x1A bytes for
the rest of **GrpPrl**.

The following table shows the tenth **Prl** in **GrpPrl**.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 00000032   | 0004     | Prl **- GrpPrl\[9\]** |           |
| 00000032   | 0002     | Sprm **- sprm**       |           |
| 00000032   | 9 bits   | USHORT **- ispmd**    | 0x002     |
| 00000032   | 1 bit    | USHORT **- fSpec**    | 0x1       |
| 00000032   | 3 bits   | USHORT **- sgc**      | 0x5       |
| 00000032   | 3 bits   | USHORT **- spra**     | 0x4       |
| 00000034   | 0002     | SHORT **- operand**   | 0x006C    |

Figure 50: The tenth Prl in GrpPrl

**sprm.ispmd:** If this value is 0x002 and **fSpec** is set to 0x0001,
this is sprmTDxaGapHalf.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x4 specifies that operand is two bytes in
size.

**operand:** A value of 0x006C specifies the distance, in twips, from
the logical left margin to the logical left origin of this row.

The **GrpPrl\[9\]** element is 4 bytes in size, leaving 0x16 bytes for
the rest of **GrpPrl**.

The following table shows the eleventh **Prl** in **GrpPrl**.

| **Offset** | **Size** | **Structure**                  | **Value** |
|------------|----------|--------------------------------|-----------|
| 00000036   | 0006     | Prl **- GrpPrl\[10\]**         |           |
| 00000036   | 0002     | Sprm **- sprm**                |           |
| 00000036   | 9 bits   | USHORT **- ispmd**             | 0x00A     |
| 00000036   | 1 bit    | USHORT **- fSpec**             | 0x0       |
| 00000036   | 3 bits   | USHORT **- sgc**               | 0x5       |
| 00000036   | 3 bits   | USHORT **- spra**              | 0x3       |
| 00000038   | 0004     | [TLP](#tlp) **- operand**      |           |
| 00000038   | 0002     | SHORT **- itl**                | 0x0000    |
| 0000003A   | 0002     | [Fatl](#fatl) **- grfatl**     |           |
| 0000003A   | 1 bit    | USHORT **- fatlBorders**       | 0x0       |
| 0000003A   | 1 bit    | USHORT **- fatlShading**       | 0x0       |
| 0000003A   | 1 bit    | USHORT **- fatlFont**          | 0x0       |
| 0000003A   | 1 bit    | USHORT **- fatlColor**         | 0x0       |
| 0000003A   | 1 bit    | USHORT **- fatlBestFit**       | 0x0       |
| 0000003A   | 1 bit    | USHORT **- fatlHdrRows**       | 0x1       |
| 0000003A   | 1 bit    | USHORT **- fatlLastRow**       | 0x1       |
| 0000003A   | 1 bit    | USHORT **- fatlHdrCols**       | 0x1       |
| 0000003A   | 1 bit    | USHORT **- fatlLastCol**       | 0x1       |
| 0000003A   | 1 bit    | USHORT **- fatlNoRowBands**    | 0x0       |
| 0000003A   | 1 bit    | USHORT **- fatlNoColBands**    | 0x0       |
| 0000003A   | 5 bits   | USHORT **- padding (ignored)** | 0x00      |

Figure 51: The eleventh Prl in GrpPrl

**sprm.ispmd:** If this value is 0x0A and **fSpec** is set to 0x0, this
is sprmTTlp.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x3 specifies that **operand** is 4 bytes in
size.

**operand.itl:** A value of 0x0000 specifies that either a table
autoformat has not been applied to this table or that the last time that
a table autoformat was applied to this table, all border, shading, font,
and best fit formats were reset to the default values. The user could
have applied other properties since the last table autoformat.

**operand.grfatl.fatlBorders:** A value of 0x0 specifies that either a
table autoformat has not been applied to this table or that borders were
not applied as part of the last table autoformat.

**operand.grfatl.fatlShading:** A value of 0x0 specifies that either a
table autoformat has never been applied to this table or that shading
was not applied as part of the last table autoformat.

**operand.grfatl.fatlFont:** A value of 0x0 specifies that either a
table autoformat has not been applied to this table or that a font was
not applied as part of the last table autoformat.

**operand.grfatl.fatlColor:** A value of 0x0 specifies that either a
table autoformat has not been applied to this table, or that the
monochrome variant of the last table autoformat was used, or that the
last table autoformat did not have separate color and monochrome
variant.

**operand.grfatl.fatlBestFit:** A value of 0x0 specifies that either a
table autoformat has not been applied to this table or that the table
columns were not resized to fit their contents as part of the last table
autoformat.

**operand.grfatl.fatlHdrRows:** A value of 0x1 specifies that the first
row of this table receives special formatting if the table style
specifies special formatting for them. Special formatting is specified
by any or all of [sprmCCnf](#character-properties), sprmPCnf, and
sprmTCnf in the style definition.

**operand.grfatl.fatlLastRow:** A value of 0x1 specifies that the last
row of this table receives special formatting if the table style
specifies special formatting for them. Special formatting is specified
by any or all of sprmCCnf, sprmPCnf, and sprmTCnf in the style
definition.

**operand.grfatl.fatlHdrCols:** A value of 0x1 specifies that the
logical left column of this table receives special formatting if the
table style specifies special formatting for them. Special formatting is
specified by any or all of sprmCCnf, sprmPCnf, and sprmTCnf in the style
definition.

**operand.grfatl.fatlLastCol:** A value of 0x1 specifies that the
[**logical right**](#gt_ef86cf61-a2e3-4130-abc4-9e92dae5a2a7) column of
this table receives special formatting if the table style specifies
special formatting for them. Special formatting is specified by any or
all of sprmCCnf, sprmPCnf, and sprmTCnf in the style definition.

**operand.grfatl.fatlNoRowBands:** 0x0 specifies that the rows in
odd-numbered row bands receive special formatting if the table style
specifies special formatting for them. Special formatting is specified
by any or all of sprmCCnf, sprmPCnf, and sprmTCnf in the style
definition. The number of rows in a row band is specified by
sprmTCHorzBands in the style definition.

**operand.grfatl.fatlNoColBands:** 0x0 specifies that the rows in
odd-numbered column bands receive special formatting if the table style
specifies special formatting for them. Special formatting is specified
by any or all of sprmCCnf, sprmPCnf, and sprmTCnf in the style
definition. The number of columns in a column band is specified by
sprmTCVertBands in the style definition.

The **GrpPrl\[10\]** element is 6 bytes in size, leaving 0x10 bytes for
the rest of **GrpPrl**.

The following table shows the twelfth **Prl** in **GrpPrl**.

| **Offset** | **Size** | **Structure**                                     | **Value** |
|------------|----------|---------------------------------------------------|-----------|
| 0000003C   | 0005     | Prl **- GrpPrl\[11\]**                            |           |
| 0000003C   | 0002     | Sprm **- sprm**                                   |           |
| 0000003C   | 9 bits   | USHORT **- ispmd**                                | 0x014     |
| 0000003C   | 1 bit    | USHORT **- fSpec**                                | 0x1       |
| 0000003C   | 3 bits   | USHORT **- sgc**                                  | 0x5       |
| 0000003C   | 3 bits   | USHORT **- spra**                                 | 0x7       |
| 0000003E   | 0003     | [FtsWWidth_Table](#ftswwidth_table) **- operand** |           |
| 0000003E   | 0001     | Fts **- ftsWidth**                                | 0x01      |
| 0000003F   | 0002     | SHORT **- wWidth**                                | 0x0000    |

Figure 52: The twelfth Prl in GrpPrl

**sprm.ispmd:** If this value is 0x014 and **fSpec** is set to 0x01,
this is sprmTTableWidth.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x7 specifies that operand is 3 bytes in size.

**operand.ftsWidth:** A value of 0x01 specifies that the table has no
preferred width.

**operand.wWidth:** A value of 0x0000 is ignored.

The **GrpPrl\[11\]** element is 5 bytes in size, leaving 0x0B for the
rest of **GrpPrl**.

The following table shows the thirteenth **Prl** in **GrpPrl**.

| **Offset** | **Size** | **Structure**          | **Value** |
|------------|----------|------------------------|-----------|
| 00000041   | 0003     | Prl **- GrpPrl\[12\]** |           |
| 00000041   | 0002     | Sprm **- sprm**        |           |
| 00000041   | 9 bits   | USHORT **- ispmd**     | 0x015     |
| 00000041   | 1 bit    | USHORT **- fSpec**     | 0x1       |
| 00000041   | 3 bits   | USHORT **- sgc**       | 0x5       |
| 00000041   | 3 bits   | USHORT **- spra**      | 0x1       |
| 00000043   | 0001     | BYTE **- operand**     | 0x01      |

Figure 53: The thirteenth Prl in GrpPrl

**sprm.ispmd:** A value of 0x015 and **fSpec** 0x1 specifies that this
is sprmTFAutoFit.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x1 specifies that **operand** is 1 byte in
size.

**operand:** A value of 0x01 specifies that the columns are to be
resized to fit the contents.

The **GrpPrl\[12\]** element is 3 bytes in size, leaving 0x08 for the
rest of **GrpPrl**.

The following table shows the fourteenth **Prl** in **GrpPrl**.

| **Offset** | **Size** | **Structure**                       | **Value** |
|------------|----------|-------------------------------------|-----------|
| 00000044   | 0008     | Prl **- GrpPrl\[13\]**              |           |
| 00000044   | 0002     | Sprm **- sprm**                     |           |
| 00000044   | 9 bits   | USHORT **- ispmd**                  | 0x035     |
| 00000044   | 1 bit    | USHORT **- fSpec**                  | 0x1       |
| 00000044   | 3 bits   | USHORT **- sgc**                    | 0x5       |
| 00000044   | 3 bits   | USHORT **- spra**                   | 0x6       |
| 00000046   | 0006     | TableCellWidthOperand **- operand** |           |
| 00000046   | 0001     | BYTE **- cb**                       | 0x05      |
| 00000047   | 0002     | ItcFirstLim **- itc**               |           |
| 00000047   | 0001     | SHORT **- itcFirst**                | 0x00      |
| 00000047   | 0001     | SHORT **- itcLim**                  | 0x02      |
| 00000049   | 0003     | FtsWWidth_TablePart **- FtsWWidth** |           |
| 00000049   | 0001     | Fts **- ftsWidth**                  | 0x03      |
| 0000004A   | 0002     | SHORT **- wWidth**                  | 0x114C    |

Figure 54: The fourteenth Prl in GrpPrl

**sprm.ispmd:** If this value is 0x035 and **fSpec** is set to 0x1, this
is sprmTCellWidth.

**sprm.sgc:** A value of 0x5 specifies that **sprm** modifies a table
property.

**sprm.spra:** A value of 0x6 specifies that the first byte of
**operand** specifies the size of the rest of **operand**.

**operand.cb:** A value of 0x05 specifies the size of **operand**, not
including **operand.cb**.

**operand.itc.itcFirst:** A value of 0x0000 specifies the first
zero-based index of the first cell to which **FtsWWidth** applies.

**operand.itc.itcLim:** A value of 0x0002 specifies the zero-based index
of the first cell outside the range of cells to which **FtsWWidth**
applies. This means that the **FtsWWidth** value applies to both cells
in the row.

**operand.FtsWWidth.ftsWidth:** A value of 0x03 specifies that
**wWidth** is a measurement in twips.

**operand.FtsWWidth.wWidth:** A value of 0x114C specifies the preferred
width of each cell, in twips. This value overrides the widths that are
specified in **GrpPrl\[5\]** and **GrpPrl\[6\]**.

The **GrpPrl\[13\]** element is 8 bytes in size, consuming all remaining
space in **GrpPrl**.
