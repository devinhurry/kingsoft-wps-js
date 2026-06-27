# Structure Examples

## Example of a PlcBtePapx

The following is an example of a [**PlcBtePapx**](#plcbtepapx). This
example demonstrates how to apply paragraph properties to text in a
document. See section
[2.4.6.1](#Section_61b635c32c444155bf17fec281b30c71), Direct Paragraph
Formatting.

| **Offset** | **Size** | **Structure**                                 | **Value**  |
|------------|----------|-----------------------------------------------|------------|
| 0000009A   | 02E8     | [FibRgFcLcb97](#fibrgfclcb97) **- rgFcLcb97** |            |
| 0000009A   | 0060     | ... (omitted for brevity) **-**               |            |
| 00000102   | 0004     | **- fcPlcfBtePapx**                           | 0x0000010E |
| 00000106   | 0004     | **- lcbPlcfBtePapx**                          | 0x0000000C |
| 0000010A   | 0278     | ... (omitted for brevity) **-**               |            |

Figure 30: Portions of the FibRgFcLcb97 structure, highlighting
fc/lcbPlcfBtePapx

The FibRgFcLcb97 structure is very large. Most fields are omitted for
reasons of brevity.

**fcPlcfBtePapx:** A value of 0x0000010E specifies the offset, in bytes,
of a location in the [Table
Stream](#Section_44f62054d9114989946ca42100c26a15). A **PlcBtePapx**
structure begins at this offset.

**lcbPlcfBtePapx:** A value of 0x0000000C specifies the size, in bytes,
of the **PlcBtePapx** at offset 0x0000010E in the Table Stream. Because
each [**PnFkpPapx**](#pnfkppapx) structure is 4 bytes, this
**PlcBtePapx** structure contains exactly two
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)s and one **PnFkpPapx**.

The following table shows the top level of the **PlcBtePapx** structure
at offset 0x0000010E in the Table Stream.

| **Offset** | **Size** | **Structure**               | **Value**  |
|------------|----------|-----------------------------|------------|
| 0000010E   | 000C     | PlcBtePapx **- PlcBtePapx** |            |
| 0000010E   | 0004     | LONG **- fc\[0\]**          | 0x00000400 |
| 00000112   | 0004     | LONG **- fc\[1\]**          | 0x0000040B |
| 00000116   | 0004     | PnFkpPapx **- pn\[0\]**     |            |
| 00000116   | 22 bits  | LONG **- pn**               | 0x000004   |
| 00000116   | 10 bits  | LONG **- unused**           | 0x000      |

Figure 31: A PlcBtePapx

**fc\[0\]:** A value of 0x00000400 specifies the offset in the
[WordDocument Stream](#Section_d7fae142670d4cd5869a708366984a71) at
which a text range begins. The fact that there are only two FCs
indicates that this is the first and only text range that is specified.

**fc\[1\]:** A value of 0x0000040B specifies the offset in the
WordDocument Stream immediately after the end of the text range. Because
the text is 8-bit ANSI (see Section
[2.4.1](#Section_01d5d8c4cf9c4ef980fd439e763cfe01), Retrieving Text),
the end of the text range is 0x40A. If this document had more than one
text range, 0x0000040B would also specify the start of the next text
range.

**pn\[0\].pn:** A value of 0x00000004 specifies the offset in the
WordDocument Stream of the [**PapxFkp**](#papxfkp) structure that is
applied to any paragraph in the document which ends within the text
range. This **PapxFkp** element is referred to as **papxfkp\[0\]**. The
**papxfkp\[0\]** element begins at offset 4 \* 512 = 2048 = 0x00000800.
See the following table for the expansion of the **papxfkp\[0\]**
element.

**pn\[0\].unused:** This value is undefined and ignored.

The following table shows the expansion of the **papxfkp\[0\]** element,
which specifies the paragraph formatting properties for all paragraphs
ending in the first and only text range in the document. In this example
all paragraphs in the document start and end within this text range.

| **Offset** | **Size** | **Structure**                   | **Value**                           |
|------------|----------|---------------------------------|-------------------------------------|
| 00000800   | 0200     | PapxFkp **- papxfkp\[0\]**      |                                     |
| 00000800   | 0010     | Array of ULONG **- rgfc**       |                                     |
| 00000800   | 0004     | ULONG **- rgfc\[0\]**           | 0x00000400                          |
| 00000804   | 0004     | ULONG **- rgfc\[1\]**           | 0x00000405                          |
| 00000808   | 0004     | ULONG **- rgfc\[2\]**           | 0x0000040A                          |
| 0000080C   | 0004     | ULONG **- rgfc\[3\]**           | 0x0000040B                          |
| 00000810   | 0027     | Array of BxPap **- rgbx**       |                                     |
| 00000810   | 000D     | [BxPap](#bxpap) **- rgbx\[0\]** |                                     |
| 00000810   | 0001     | BYTE **- bOffset**              | 0xFA                                |
| 00000811   | 000C     | FixedBlob **- reserved**        | 00 00 00 00 00 00 00 00 00 00 00 00 |
| 0000081D   | 000D     | BxPap **- rgbx\[1\]**           |                                     |
| 0000081D   | 0001     | BYTE **- bOffset**              | 0xF6                                |
| 0000081E   | 000C     | FixedBlob **- reserved**        | 00 00 00 00 00 00 00 00 00 00 00 00 |
| 0000082A   | 000D     | BxPap **- rgbx\[2\]**           |                                     |
| 0000082A   | 0001     | BYTE **- bOffset**              | 0xF4                                |
| 0000082B   | 000C     | FixedBlob **- reserved**        | 00 00 00 00 00 00 00 00 00 00 00 00 |
| 000009FF   | 0001     | BYTE **- cpara**                | 0x03                                |

Figure 32: Expansion of papxfkp\[0\]

**rgfc.rgfc\[0\]:** A value of 0x00000400 specifies the offset in the
WordDocument Stream at which the first paragraph in the text range
begins. This paragraph ends at offset 0x00000404, and spans the text
"Test" followed by a newline character.

**rgfc.rgfc\[1\]:** A value of 0x00000405 specifies the offset in the
WordDocument Stream at which the second paragraph in the text range
begins. This paragraph ends at 0x00000409, immediately before the start
of the next paragraph, and includes the text "Test" followed by a
newline character.

**rgfc.rgfc\[2\]:** A value of 0x0000040A specifies the offset in the
WordDocument Stream at which the third paragraph in the text range
begins. This paragraph ends at 0x0000040A, and is therefore a single
character, which is a newline character.

**rgfc.rgfc\[3\]:** A value of 0x0000040B specifies the offset in the
WordDocument Stream immediately after where the third paragraph in the
text range ends.

**rgbx.rgbx\[0\].bOffset:** A value of 0xFA specifies the offset of the
[**PapxInFkp**](#papxinfkp) structure for the first paragraph, referred
to as **papxinfkp\[0\]** (see the following table for its expansion).
The **papxinfkp\[0\]** element is 2 \* 0xFA = 0x1F4 bytes from the start
of the **papxfkp\[0\]** element, or 0x800 + 0x1F4 = 0x9F4 bytes from the
start of the Table Stream.

**rgbx.rgbx\[0\].reserved:** This value is ignored.

**rgbx.rgbx\[1\].bOffset:** A value of 0xF6 specifies the offset of the
**PapxInFkp** for the second paragraph, referred to as
**papxinfkp\[1\]** (see its expansion later). The **papxinfkp\[1\]**
element is 2 \* 0xF6 = 0x1EC bytes from the start of the
**papxfkp\[1\]** element, or 0x800 + 0x1EC = 0x9EC bytes from the start
of the Table Stream.

**rgbx.rgbx\[1\].reserved:** This value is ignored.

**rgbx.rgbx\[2\].bOffset:** A value of 0xF4 specifies the offset of the
PapxInFkp for the first paragraph, referred to as **papxinfkp\[2\]**
(see the following expansion of this element). The **papxinfkp\[2\]**
element is 2 \* 0xF4 = 0x1E8 bytes from the start of the
**papxfkp\[2\]** element, or 0x800 + 0x1E8 = 0x9E8 bytes from the start
of the Table Stream.

**rgbx.rgbx\[2\].reserved:** This value is ignored.

**cpara:** A value of 0x03 specifies the number of paragraphs in this
text range. This is equal to the number of elements in
**papxfkp\[0\].rgbx**, and 1 less than the number of elements in
**papxfkp\[0\].rgfc**.

The following table shows the expansion of the **papxinfkp\[0\]**
element, which specifies the paragraph property information for the
first paragraph of the text range.

| **Offset** | **Size** | **Structure**                                | **Value** |
|------------|----------|----------------------------------------------|-----------|
| 000009F4   | 000A     | PapxInFkp **- papxinfkp\[0\]**               |           |
| 000009F4   | 0001     | BYTE **- cb**                                | 0x00      |
| 000009F5   | 0001     | BYTE **- cb'**                               | 0x04      |
| 000009F6   | 0008     | [GrpPrlAndIstd](#grpprlandistd) **- GrpPrl** |           |
| 000009F6   | 0002     | USHORT **- istd**                            | 0x0000    |
| 000009F8   | 0003     | [Prl](#prl) **- GrpPrl\[0\]**                |           |
| 000009FB   | 0003     | Prl **- GrpPrl\[1\]**                        |           |

Figure 33: Expansion of papxinfkp\[0\]

**cb:** A value of 0x00 specifies that size of **GrpPrl** is determined
by **cb'**.

**cb':** A value of 0x04 specifies that there are 2 \* 4 = 8 bytes in
**GrpPrl**.

**GrpPrl.istd:** A value of 0x0000 specifies that the Normal style will
be applied to this paragraph. See Section
[2.4.6.5](#Section_9258b41cff0a4c96a3a9610664dabbeb), Determining
Properties of a Style.

**GrpPrl.GrpPrl\[0\]:** The first property that is being applied. See
the **papxinfkp\[0\].GrpPrl.GrpPrl\[0\]** element in the following
table.

**GrpPrl.GrpPrl\[1\]:** The second property that is being applied. See
the **papxinfkp\[0\].GrpPrl.GrpPrl\[1\]** element that follows.

The **papxinfkp\[0\]** element contains only some of the properties that
apply to the first paragraph of the text range. The properties that are
not contained in the **papxinfkp\[0\]** element take on their respective
default values.

The following table shows the expansion of the
**papxinfkp\[0\].GrpPrl.GrpPrl\[0\]** element, which is the first
property that is applied to the first paragraph ("Test" followed by a
newline character). This element specifies that the paragraph will be
center-justified.

| **Offset** | **Size** | **Structure**                               | **Value** |
|------------|----------|---------------------------------------------|-----------|
| 000009F8   | 0003     | Prl **- papxinfkp\[0\].GrpPrl.GrpPrl\[0\]** |           |
| 000009F8   | 0002     | [Sprm](#sprm) **- sprm**                    |           |
| 000009F8   | 9 bits   | USHORT **- ispmd**                          | 0x003     |
| 000009F8   | 1 bit    | USHORT **- fSpec**                          | 0x0       |
| 000009F8   | 3 bits   | USHORT **- sgc**                            | 0x1       |
| 000009F8   | 3 bits   | USHORT **- spra**                           | 0x1       |
| 000009FA   | 0001     | BYTE **- operand**                          | 0x01      |

Figure 34: Expansion of papxinfkp\[0\].GrpPrl.GrpPrl\[0\]

**sprm:** The property that is being modified.

**sprm.ispmd:** If **ispmd** is equal to 0x0003 and **fSpec** is equal
to 0x0000, this property is [sprmPJc80](#paragraph-properties).

**sprm.sgc:** A value of 0x1 specifies that this is a paragraph
property.

**sprm.spra:** A value of 0x1 specifies that **operand** is 1 byte long.

**operand:** The property value, which is an unsigned integer specifying
the paragraph justification. A value of 0x1 specifies that the paragraph
will be center-justified.

The following table shows the expansion of
**papxinfkp\[0\].GrpPrl.GrpPrl\[1\],** which is the second property that
is applied to the first paragraph ("Test" followed by a newline
character). This value specifies that the paragraph will be
center-justified. Because this property occurs after the occurrence of
sprmPJc80, the justification that it specifies takes precedence. In this
case they both specify center justification, so the paragraph
justification is unchanged.

| **Offset** | **Size** | **Structure**                            | **Value** |
|------------|----------|------------------------------------------|-----------|
| 000009FB   | 0003     | Prl **- papxinfkp\[0\].GrpPrl.prl\[1\]** |           |
| 000009FB   | 0002     | Sprm **- sprm**                          |           |
| 000009FB   | 9 bits   | USHORT **- ispmd**                       | 0x061     |
| 000009FB   | 1 bit    | USHORT **- fSpec**                       | 0x0       |
| 000009FB   | 3 bits   | USHORT **- sgc**                         | 0x1       |
| 000009FB   | 3 bits   | USHORT **- spra**                        | 0x1       |
| 000009FD   | 0001     | BYTE **- operand**                       | 0x01      |

Figure 35: Expansion of papxinfkp\[0\].GrpPrl.GrpPrl\[1\]

**sprm:** The property that is being modified.

**sprm.ispmd:** If **ispmd** is equal to 0x0061 and **fSpec** is equal
to 0x0000, this property is sprmPJc.

**sprm.sgc:** A value of 0x1 specifies that this is a paragraph
property, which is appropriate because **fcPlcfBtePapx** specifies
paragraph properties.

**sprm.spra:** A value of 0x1 specifies that **operand** is 1 byte long.

**operand:** The property value, which is an unsigned integer that
specifies the paragraph justification. A value of 0x01 specifies that
the paragraph will be center-justified.

The following table shows the expansion of the **papxinfkp\[1\]**
element, which specifies the paragraph property information for the
second paragraph of the text range.

| **Offset** | **Size** | **Structure**                  | **Value** |
|------------|----------|--------------------------------|-----------|
| 000009EC   | 0008     | PapxInFkp **- papxinfkp\[1\]** |           |
| 000009EC   | 0001     | BYTE **- cb**                  | 0x00      |
| 000009ED   | 0001     | BYTE **- cb'**                 | 0x03      |
| 000009EE   | 0006     | GrpPrlAndIstd **- GrpPrl**     |           |
| 000009EE   | 0002     | USHORT **- istd**              | 0x0000    |
| 000009F0   | 0004     | Prl **- GrpPrl\[0\]**          |           |

Figure 36: Expansion of papxinfkp\[1\]

**cb:** A value of 0x00 specifies that the size of **GrpPrl** is
determined by **cb'**.

**cb':** A value of 0x03 specifies that there are 2 \* 3 = 6 bytes in
**GrpPrl**.

**GrpPrl.istd:** A value of 0x0000 specifies that the Normal style will
be applied to this paragraph. See section 2.4.6.5, Determining
Properties of a Style.

**GrpPrl.GrpPrl\[0\]:** The first and only property that is being
applied. See **papxinfkp\[1\].GrpPrl.GrpPrl\[0\]** in the following
table.

**papxinfkp\[1\]** contains only some of the properties that apply to
the second paragraph of the text range. The properties that are not
contained in **papxinfkp\[1\]** take on their respective default values.

The following table shows the expansion of the
**papxinfkp\[1\].GrpPrl.GrpPrl\[0\]** element, which is the first
property that is applied to the second paragraph ("Test" followed by a
newline character). It specifies that there are 0x0168
[**twips**](#gt_4b82472c-103d-4eff-a07e-6a0f784e3382) of vertical space
before this paragraph.

| **Offset** | **Size** | **Structure**                               | **Value** |
|------------|----------|---------------------------------------------|-----------|
| 000009F0   | 0004     | Prl **- papxinfkp\[1\].GrpPrl.GrpPrl\[0\]** |           |
| 000009F0   | 0002     | Sprm **- sprm**                             |           |
| 000009F0   | 9 bits   | USHORT **- ispmd**                          | 0x013     |
| 000009F0   | 1 bit    | USHORT **- fSpec**                          | 0x0       |
| 000009F0   | 3 bits   | USHORT **- sgc**                            | 0x1       |
| 000009F0   | 3 bits   | USHORT **- spra**                           | 0x5       |
| 000009F2   | 0002     | USHORT **- operand**                        | 0x0168    |

Figure 37: Expansion of papxinfkp\[1\].GrpPrl.GrpPrl\[0\]

**sprm:** The property that is being modified.

**sprm.ispmd:** If **ispmd** is equal to 0x0013 and **fSpec** is equal
to 0x0000, this property is sprmPDyaBefore.

**sprm.sgc:** A value of 0x1 specifies that this is a paragraph
property, which is appropriate because **fcPlcfBtePapx** specifies
paragraph properties.

**sprm.spra:** A value of 0x5 specifies that **operand** is two bytes
long.

**operand:** The property value, which is an unsigned integer that
specifies the number of twips of vertical space before this paragraph. A
value of 0x0168 specifies there SHOULD be 0x0168 twips of vertical space
before this paragraph.

The following table shows the expansion of **papxinfkp\[2\]**, which
specifies the paragraph property information for the third paragraph of
the text range.

| **Offset** | **Size** | **Structure**                  | **Value** |
|------------|----------|--------------------------------|-----------|
| 000009E8   | 0004     | PapxInFkp **- papxinfkp\[2\]** |           |
| 000009E8   | 0001     | BYTE **- cb**                  | 0x00      |
| 000009E9   | 0001     | BYTE **- cb'**                 | 0x01      |
| 000009E9   | 0002     | GrpPrlAndIstd **- GrpPrl**     |           |
| 000009EA   | 0002     | USHORT **- istd**              | 0x0000    |

Figure 38: Expansion of papxinfkp\[2\]

**cb:** A value of 0x00 specifies that the size of **GrpPrl** is
determined by **cb'**.

**cb':** A value of 0x01 specifies that there are 2 \* 1 = 2 bytes in
**GrpPrl**. The **GrpPrl.istd** element takes up two bytes; this means
that **GrpPrl** has no **Prl** elements.

**GrpPrl.istd:** A value of 0x0000 specifies that the Normal style will
be applied to this paragraph. See section 2.4.6.5, Determining
Properties of a Style.

Because **papxinfkp\[2\]** contains no properties, all properties for
the third paragraph of the text range take on their respective default
values.
