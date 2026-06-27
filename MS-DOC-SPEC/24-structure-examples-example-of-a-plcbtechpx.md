# Structure Examples

## Example of a PlcBteChpx

The following is an example of a [**PlcBteChpx**](#plcbtechpx)
structure. It demonstrates how to apply character formatting properties
to text in a document. See section
[2.4.6.2](#Section_be58bf9cd1d340cc91ee36452d7939b2), Direct Character
Formatting.

| **Offset** | **Size** | **Structure**                                 | **Value**  |
|------------|----------|-----------------------------------------------|------------|
| 0000009A   | 02E8     | [FibRgFcLcb97](#fibrgfclcb97) **- rgFcLcb97** |            |
| 0000009A   | 0060     | ... (omitted for brevity) **-**               |            |
| 000000FA   | 0004     | **- fcPlcfBteChpx**                           | 0x000000D6 |
| 000000FE   | 0004     | **- lcbPlcfBteChpx**                          | 0x0000000C |
| 00000102   | 0280     | ... (omitted for brevity) **-**               |            |

Figure 22: Portions of the FibRgFcLcb97 structure, highlighting
fc/lcbPlcfBteChpx

The FibRgFcLcb97 structure is very large. Most fields have been omitted
here for brevity.

**fcPlcfBteChpx:** A value of 0x000000D6 specifies the offset, in bytes,
of a location in the [Table
Stream](#Section_44f62054d9114989946ca42100c26a15). A **PlcBteChpx**
structure begins at this offset.

**lcbPlcfBteChpx:** A value of 0x0000000C specifies the size, in bytes,
of the PlcBteChpx at offset 0x000000D6 in the Table Stream. Because each
[**PnFkpChpx**](#pnfkpchpx) structure is four bytes, this **PlcBteChpx**
structure contains exactly two
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)s and one **PnFkpChpx**
structures.

The following table shows the top level of the **PlcBteChpx** at offset
0x000000D6 in the Table Stream.

| **Offset** | **Size** | **Structure**               | **Value**  |
|------------|----------|-----------------------------|------------|
| 000000D6   | 000C     | PlcBteChpx **- PlcBteChpx** |            |
| 000000D6   | 0004     | LONG **- fc\[0\]**          | 0x00000400 |
| 000000DA   | 0004     | LONG **- fc\[1\]**          | 0x00000411 |
| 000000DE   | 0004     | PnFkpChpx **- pn\[0\]**     |            |
| 000000DE   | 22 bits  | LONG **- pn**               | 0x000003   |
| 000000DE   | 10 bits  | LONG **- unused**           | 0x000      |

Figure 23: A PlcBteChpx

**fc\[0\]:** 0x00000400 specifies the offset in the [WordDocument
Stream](#Section_d7fae142670d4cd5869a708366984a71) where a text range
begins. This is the first and only text range that is specified; this is
evident because there are only two FCs.

**fc\[1\]:** 0x00000411 specifies the offset in the WordDocument Stream
immediately after the end of the text range. Because the text is 8-bit
ANSI (see Section [2.4.1](#Section_01d5d8c4cf9c4ef980fd439e763cfe01),
Retrieving Text) the end of the text range is 0x410. If this document
had more than one text range, 0x00000411 would also specify the start of
the next text range.

**pn\[0\].pn:** 0x00000003 specifies the offset in the WordDocument
Stream of the [**ChpxFkp**](#chpxfkp) structure that is applied to the
text range. This **ChpxFkp** structure is referred to as
**chpxfkp\[0\]**. The **chpxfkp\[0\]** element begins at offset 3 \* 512
= 1536 = 0x00000600. See the following table for the expansion of
**chpxfkp\[0\]**.

**pn\[0\].unused:** Undefined and ignored.

The following table shows the expansion of **chpxfkp\[0\]**, which
specifies the character formatting properties for the first and only
text range in the document.

| **Offset** | **Size** | **Structure**              | **Value**  |
|------------|----------|----------------------------|------------|
| 00000600   | 0200     | ChpxFkp **- chpxfkp\[0\]** |            |
| 00000600   | 0010     | Array of ULONG **- rgfc**  |            |
| 00000600   | 0004     | ULONG **- rgfc\[0\]**      | 0x00000400 |
| 00000604   | 0004     | ULONG **- rgfc\[1\]**      | 0x00000407 |
| 00000608   | 0004     | ULONG **- rgfc\[2\]**      | 0x00000410 |
| 0000060C   | 0004     | ULONG **- rgfc\[3\]**      | 0x00000411 |
| 00000610   | 0003     | Array of BYTE **- rgb**    |            |
| 00000610   | 0001     | BYTE **- rgb\[0\]**        | 0xFA       |
| 00000611   | 0001     | BYTE **- rgb\[1\]**        | 0xF8       |
| 00000612   | 0001     | BYTE **- rgb\[2\]**        | 0x00       |
| 000007FF   | 0001     | BYTE **- crun**            | 0x03       |

Figure 24: Expansion of chpxfkp\[0\]

**rgfc.rgfc\[0\]:** A value of 0x00000400 specifies the offset in the
WordDocument Stream at which the first text run in the text range
begins. This text run ends at 0x00000406, immediately before the start
of the next run, and includes the text "Orange".

**rgfc.rgfc\[1\]:** A value of 0x00000407 specifies the offset in the
WordDocument Stream at which the second text run in the text range
begins. This text run ends at 0x0000040F, immediately before the start
of the next run, and includes the text "Underline".

**rgfc.rgfc\[2\]:** A value of 0x00000410 specifies the offset in the
WordDocument Stream at which the third text run in the text range
begins. This text run ends at 0x00000410, and is therefore a single
character, which is a paragraph marker.

**rgfc.rgfc\[3\]:** A value of 0x00000411 specifies the offset in the
WordDocument Stream immediately after the end of the third text run in
the text range.

**rgb.rgb\[0\]:** A value of 0xFA specifies the offset of the
[Chpx](#chpx) for the first text run, referred to as **chpx\[0\]** (see
its expansion later). The **chpx\[0\]** element is 2 \* 0xFA = 0x1F4
bytes from the start of **chpxfkp\[0\]**, or 0x600 + 0x1F4 = 0x7F4 bytes
from the start of the Table Stream.

**rgb.rgb\[1\]:** A value of 0xF8 specifies the offset of the Chpx for
the second text run, referred to as **chpx\[1\]** (see its expansion
later). The **chpx\[1\]** element is 2 \* 0xF8 = 0x1F0 bytes from the
start of **chpxfkp\[0\]**, or 0x600 + 0x1F0 = 0x7F0 bytes from the start
of the Table Stream.

**rgb.rgb\[2\]:** A value of 0x00 specifies that there are no character
properties associated with the third text run.

**crun:** A value of 0x03 specifies the number of runs in this text
range. This is equal to the number of elements in **rgb**, and is 1 less
than the number of elements in **rgfc**.

The following table shows the expansion of the **chpx\[0\]** element,
which specifies the character property information for the first text
run of the text range.

| **Offset** | **Size** | **Structure**                 | **Value** |
|------------|----------|-------------------------------|-----------|
| 000007F4   | 000A     | Chpx **- chpx\[0\]**          |           |
| 000007F4   | 0001     | BYTE **- cb**                 | 0x09      |
| 000007F5   | 0009     | Array of Prl **- GrpPrl**     |           |
| 000007F5   | 0003     | [Prl](#prl) **- GrpPrl\[0\]** |           |
| 000007F8   | 0006     | Prl **- GrpPrl\[1\]**         |           |

Figure 25: Expansion of chpx\[0\]

**cb:** A value of 0x09 specifies that **GrpPrl** is 9 bytes long.

**GrpPrl:** The array of properties being applied.

**GrpPrl.GrpPrl\[0\]:** The first property that is being applied. See
the **chpx\[0\].GrpPrl.GrpPrl\[0\]** element that is described later in
this document.

**GrpPrl.GrpPrl\[1\]:** The second property that is being applied. See
the **chpx\[0\].GrpPrl.GrpPrl\[1\]** element that is described later in
this document. The fact that there are no more bytes left in the
**GrpPrl** element after this property is read indicates that there are
no more properties.

The **chpx\[0\]** element contains some of the properties that apply to
the first run of the text range. The properties that are not contained
in **chpx\[0\]** take on their respective default values.

The following table shows the expansion of the
**chpx\[0\].GrpPrl.GrpPrl\[0\]** element, which is the first property
that is applied to the first text run ("Orange "). It applies a color to
the text.

| **Offset** | **Size** | **Structure**                          | **Value** |
|------------|----------|----------------------------------------|-----------|
| 000007F5   | 0003     | Prl **- chpx\[0\].GrpPrl.GrpPrl\[0\]** |           |
| 000007F5   | 0002     | [Sprm](#sprm) **- sprm**               |           |
| 000007F5   | 9 bits   | USHORT **- ispmd**                     | 0x042     |
| 000007F5   | 1 bit    | USHORT **- fSpec**                     | 0x1       |
| 000007F5   | 3 bits   | USHORT **- sgc**                       | 0x2       |
| 000007F5   | 3 bits   | USHORT **- spra**                      | 0x1       |
| 000007F7   | 0001     | [Ico](#ico) **- operand**              |           |
| 000007F7   | 0001     | BYTE **- value**                       | 0x07      |

Figure 26: Expansion of chpx\[0\].GrpPrl.GrpPrl\[0\]

**sprm:** The property being modified.

**sprm.ispmd:** If **ispmd** is equal to 0x0042 and **fSpec** is equal
to 0x0001, this property has a value of
[sprmCIco](#character-properties).

**sprm.sgc:** A value of 0x2 specifies that this is a character
property.

**sprm.spra:** A value of 0x1 specifies that **operand** is 1 byte long.

**operand:** The property value, which is an RGB color value that is
expressed by an **Ico** structure.

**operand.value:** A value of 0x07 specifies that the text color will be
represented using RGB (0xFF, 0xFF, 0x00) values.

The following table shows the expansion of the
**chpx\[0\].GrpPrl.GrpPrl\[1\]** element, which is the second property
that is applied to the first text run ("Orange"). It also applies a
color to the text. Because this property occurs after the occurrence of
sprmCIco, the color it specifies takes precedence.

| **Offset** | **Size** | **Structure**                          | **Value** |
|------------|----------|----------------------------------------|-----------|
| 000007F8   | 0006     | Prl **- chpx\[0\].GrpPrl.GrpPrl\[1\]** |           |
| 000007F8   | 0002     | Sprm **- sprm**                        |           |
| 000007F8   | 9 bits   | USHORT **- ispmd**                     | 0x070     |
| 000007F8   | 1 bit    | USHORT **- fSpec**                     | 0x0       |
| 000007F8   | 3 bits   | USHORT **- sgc**                       | 0x2       |
| 000007F8   | 3 bits   | USHORT **- spra**                      | 0x3       |
| 000007FA   | 0004     | [COLORREF](#colorref) **- operand**    |           |
| 000007FA   | 0001     | BYTE **- red**                         | 0xFF      |
| 000007FB   | 0001     | BYTE **- green**                       | 0x99      |
| 000007FC   | 0001     | BYTE **- blue**                        | 0x00      |
| 000007FD   | 0001     | BYTE **- fAuto**                       | 0x00      |

Figure 27: Expansion of chpx\[0\].GrpPrl.GrpPrl\[1\]

**sprm:** The property that is being modified.

**sprm.ispmd:** If **ispmd** is equal to 0x0070 and **fSpec** is equal
to 0x0000, the value of this property is sprmCCv.

**sprm.sgc:** A value of 0x2 specifies that this is a character
property.

**sprm.spra:** A value of 0x3 specifies that **operand** is four bytes
long.

**operand:** The property value, which is an RGB color value that is
expressed by a COLORREF.

**operand.red:** A value of 0xFF specifies the red component of the RGB
value.

**operand.green:** A value of 0x99 specifies the green component of the
RGB value.

**operand.blue:** A value of 0x00 specifies the blue component of the
RGB value.

**operand.fAuto:** A value of 0x00 specifies that the RGB value will be
used as specified.

The following table shows the expansion of the **chpx\[1\]** element,
which specifies the character property information for the second text
run of the text range ("Underline").

| **Offset** | **Size** | **Structure**           | **Value** |
|------------|----------|-------------------------|-----------|
| 000007F0   | 0004     | Chpx **- chpx\[1\]**    |           |
| 000007F0   | 0001     | BYTE **- cb**           | 0x03      |
| 000007F1   | 0003     | GrpPrlChpx **- GrpPrl** |           |
| 000007F1   | 0003     | Prl **- GrpPrl\[0\]**   |           |

Figure 28: Expansion of chpx\[1\]

**cb:** A value of 0x03 specifies that **GrpPrl** is 3 bytes long.

**GrpPrl:** The array of properties that is being applied.

**GrpPrl.GrpPrl\[0\]:** The first and only property that is being
applied. See the **chpx\[1\].GrpPrl.GrpPrl\[0\]** element in the
following table.

The **chpx\[1\]** element contains only some of the properties that
apply to the second run of the text range. The properties that are not
contained in the **chpx\[1\]** element take on their respective default
values.

The following table shows the expansion of the
**chpx\[1\].GrpPrl.GrpPrl\[0\]** value, which is the first and only
property that is applied to the second text run.

| **Offset** | **Size** | **Structure**                          | **Value** |
|------------|----------|----------------------------------------|-----------|
| 000007F1   | 0003     | Prl **- chpx\[1\].GrpPrl.GrpPrl\[0\]** |           |
| 000007F1   | 0002     | Sprm **- sprm**                        |           |
| 000007F1   | 9 bits   | USHORT **- ispmd**                     | 0x03E     |
| 000007F1   | 1 bit    | USHORT **- fSpec**                     | 0x1       |
| 000007F1   | 3 bits   | USHORT **- sgc**                       | 0x2       |
| 000007F1   | 3 bits   | USHORT **- spra**                      | 0x1       |
| 000007F3   | 0001     | [Kul](#kul) **- operand**              | 0x01      |

Figure 29: Expansion of chpx\[1\].GrpPrl.GrpPrl\[0\]

**sprm:** The property that is being modified.

**sprm.ispmd:** If **ispmd** is equal to 0x003E and **fSpec** is equal
to 0x0001, the value of this property is sprmCKul.

**sprm.sgc:** A value of 0x2 specifies that this is a character
property.

**sprm.spra:** A value of 0x1 specifies that **operand** is 1 byte long.

**operand:** A value of 0x01 specifies that the text has a single
underline.
