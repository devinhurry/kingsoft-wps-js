# Structure Examples

## Example of a section

A document that is created by using this specification is divided into
[**sections**](#gt_49a2b98a-d101-4889-9108-87f567e758cf). Each section
can store unique page-level formatting such as page size and
orientation, in addition to other features such as headers and footers.
A document contains at least 1 section.

[**PlcfSed**](#plcfsed) contains information about how the document is
divided into sections, as well as the properties of each section. The
following is an example of a **PlcfSed** that was taken from a small
document with two sections.

To find the **PlcfSed**, start in the FibRgFcLcb97.

| **Offset** | **Size** | **Structure**                                 | **Value**  |
|------------|----------|-----------------------------------------------|------------|
| 0000009A   | 02E8     | [FibRgFcLcb97](#fibrgfclcb97) **- rgFcLcb97** |            |
| 0000009A   | 0030     | ... (omitted for brevity) **-**               |            |
| 000000CA   | 0004     | ULONG **- fcPlcfSed**                         | 0x000012D5 |
| 000000CE   | 0004     | ULONG **- lcbPlcfSed**                        | 0x00000024 |
| 000000D2   | 02B0     | ... (omitted for brevity) **-**               |            |

Figure 12: Portions of the FibRgFcLcb97 structure, highlighting
fc/lcbPlcfSed

The FibRgFcLcb97 structure is very large. Most fields have been omitted
here for brevity.

**fcPlcfSed:** 0x000012D5 specifies that the **PlcfSed** structure
begins at byte 0x12D5 in the [Table
Stream](#Section_44f62054d9114989946ca42100c26a15).

**lcbPlcfSed:** 0x00000024 specifies that the **PlcfSed** structure is
36 bytes long. Because each [**Sed**](#sed) structure is 12 bytes, the
**PlcfSed** structure contains exactly three
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)s and two **Sed**
structures.

Using the offset and length that are specified by **fcPlcfSed** and
**lcbPlcfSed**, read the **PlcfSed** structure, shown following.

| **Offset** | **Size** | **Structure**         | **Value**  |
|------------|----------|-----------------------|------------|
| 000012D5   | 0024     | PlcfSed **- PlcfSed** |            |
| 000012D5   | 0004     | LONG **- cp\[0\]**    | 0x00000000 |
| 000012D9   | 0004     | LONG **- cp\[1\]**    | 0x0000000B |
| 000012DD   | 0004     | LONG **- cp\[2\]**    | 0x00000016 |
| 000012E1   | 000C     | Sed **- sed\[0\]**    |            |
| 000012E1   | 0002     | SHORT **- fn**        | 0x000D     |
| 000012E3   | 0004     | ULONG **- fcSepx**    | 0x00000E00 |
| 000012E7   | 0002     | SHORT **- fnMpr**     | 0x0000     |
| 000012E9   | 0004     | ULONG **- fcMpr**     | 0xFFFFFFFF |
| 000012ED   | 000C     | Sed **- sed\[1\]**    |            |
| 000012ED   | 0002     | SHORT **- fn**        | 0x000D     |
| 000012EF   | 0004     | ULONG **- fcSepx**    | 0x00000E2E |
| 000012F3   | 0002     | SHORT **- fnMpr**     | 0x0004     |
| 000012F5   | 0004     | ULONG **- fcMpr**     | 0xFFFFFFFF |

Figure 13: The PlcfSed structure that is referenced by fcPlcfSed and
lcbPlcfSed in the FibRgFcLcb97 structure

This **PlcfSed** structure is 36 bytes long. Because each **Sed**
structure is 12 bytes, this **PlcfSed** structure contains exactly 3 CPs
and 2 **Sed** structures and from that information it can be determined
that there are 2 sections.

**cp\[0\]:** 0x00000000 specifies that the text for the first section
begins at position 0 in the [main
document](#Section_f426d9a2004d418e8d8ce7fd88e7c48e).

**cp\[1\]:** 0x0000000B specifies that the text for the second section
begins at position 11 in the main document. The last character in the
first section is at position 10, and has a
[**Unicode**](#gt_c305d0ab-8b94-461a-bd76-13b40cb8c4d8) value of 0x0C.

**cp\[2\]:** 0x00000016 specifies that the remainder of this document is
in the second section. The character position 21 does not need to be
0x0C, because no more sections follow it.

**sed\[0\]:** The **Sed** structure for the text range from **cp\[0\]**
to **cp\[1\]**.

**sed\[0\].fcSepx:** 0x00000E00 specifies that the properties for the
section are found at position 0x0E00 in the [WordDocument
Stream](#Section_d7fae142670d4cd5869a708366984a71).

**sed\[0\].fnMpr:** 0x0000, **sed\[0\].fcMpr:** 0xFFFFFFFF, and
**sed\[0\].fn:** 0x000D are ignored.

**sed\[1\]:** The **Sed** structure for the text range from **cp\[1\]**
to **cp\[2\]**. Its **fcSepx** field specifies that the properties for
the second section are a [**Sepx**](#sepx) structure that begins at byte
0x00000E2E in the WordDocument Stream.

The details for **sed\[1\]** are very similar to **sed\[0\]**. They have
been omitted for brevity.

Use the offset specified in **sed\[0\].fcSepx** to find the **Sepx**
structure that contains the properties of the first section.

| **Offset** | **Size** | **Structure**                         | **Value** |
|------------|----------|---------------------------------------|-----------|
| 00000E00   | 002E     | Sepx **- Sepx**                       |           |
| 00000E00   | 0002     | USHORT **- cb**                       | 0x002C    |
| 00000E02   | 002C     | GrpPrlSepx **- grpprl**               |           |
| 00000E02   | 0004     | [Prl](#prl) **- prl\[0\]**            |           |
| 00000E02   | 0002     | [Sprm](#sprm) **- sprmSDyaLinePitch** | 0x9031    |
| 00000E04   | 0002     | SHORT **- operand**                   | 0x0168    |
| 00000E06   | 0004     | Prl **- prl\[1\]**                    |           |
| 00000E06   | 0002     | Sprm **- sprmSXaPage**                | 0xB01F    |
| 00000E08   | 0002     | USHORT **- operand**                  | 0x2FD0    |
| 00000E0A   | 0004     | Prl **- prl\[2\]**                    |           |
| 00000E0A   | 0002     | Sprm **- sprmSYaPage**                | 0xB020    |
| 00000E0C   | 0002     | USHORT **- operand**                  | 0x3DE0    |
| 00000E0E   | 0004     | Prl **- prl\[3\]**                    |           |
| 00000E0E   | 0002     | Sprm **- sprmSDxaLeft**               | 0xB021    |
| 00000E10   | 0002     | USHORT **- operand**                  | 0x05A0    |
| 00000E12   | 0004     | Prl **- prl\[4\]**                    |           |
| 00000E12   | 0002     | Sprm **- sprmSDxaRight**              | 0xB022    |
| 00000E14   | 0002     | USHORT **- operand**                  | 0x05A0    |
| 00000E16   | 0004     | Prl **- prl\[5\]**                    |           |
| 00000E16   | 0002     | Sprm **- sprmSDyaTop**                | 0x9023    |
| 00000E18   | 0002     | SHORT **- operand**                   | 0x05A0    |
| 00000E1A   | 0004     | Prl **- prl\[6\]**                    |           |
| 00000E1A   | 0002     | Sprm **- sprmSDyaBottom**             | 0x9024    |
| 00000E1C   | 0002     | SHORT **- operand**                   | 0x05A0    |
| 00000E1E   | 0004     | Prl **- prl\[7\]**                    |           |
| 00000E1E   | 0002     | Sprm **- sprmSDzaGutter**             | 0xB025    |
| 00000E20   | 0002     | USHORT **- operand**                  | 0x0000    |
| 00000E22   | 0004     | Prl **- prl\[8\]**                    |           |
| 00000E22   | 0002     | Sprm **- sprmSDyaHdrTop**             | 0xB017    |
| 00000E24   | 0002     | USHORT **- operand**                  | 0x02D0    |
| 00000E26   | 0004     | Prl **- prl\[9\]**                    |           |
| 00000E26   | 0002     | Sprm **- sprmSDyaHdrBottom**          | 0xB018    |
| 00000E28   | 0002     | USHORT **- operand**                  | 0x02D0    |
| 00000E2A   | 0004     | Prl **- prl\[10\]**                   |           |
| 00000E2A   | 0002     | Sprm **- sprmSDxaColumns**            | 0x900C    |
| 00000E2C   | 0002     | SHORT **- operand**                   | 0x02D0    |

Figure 14: The Sepx structure that is referenced by sed\[0\].fcSepx

**cb:** 0x002C specifies that there are a total of 44 bytes (not
counting this cb) of properties that apply to section 1. Given only this
information, it cannot be determined how many properties this
represents, because property sizes vary from property to property.

**grpprl.prl\[0\]:** The first property. All properties contain a sprm
to identify them and an operand which contains the property value.

**grpprl.prl\[0\].sprmSDyaLinePitch:** 0x9031 specifies that this is the
section property [sprmSDyaLinePitch](#section-properties) and that the
operand is two bytes.

**grpprl.prl\[0\].operand:** 0x0168 specifies that the line height of
the [**document grid**](#gt_f1f5f018-eebc-4631-9036-ed857713c71c) in
section 1 is 360 [**twips**](#gt_4b82472c-103d-4eff-a07e-6a0f784e3382)
(0.25 inches)

**grpprl.prl\[1\].sprmSXaPage:** 0xB01F specifies that this is the
section property sprmSXaPage and that the operand is two bytes.

**grpprl.prl\[1\].operand:** 0x2FD0 specifies that the page width for
pages in section 1 is 12,240 twips (8.5 inches).

**grpprl.prl\[2\].sprmSYaPage:** 0xB020 specifies that this is the
section property sprmSYaPage and that the operand is two bytes.

**grpprl.prl\[2\].operand:** 0x3DE0 specifies that the page height for
pages in section 1 is 15,840 twips (11 inches).

**grpprl.prl\[3\].sprmSDxaLeft:** 0xB021 specifies that this is the
section property sprmSDxaLeft and that the operand is two bytes.

**grpprl.prl\[3\].operand:** 0x05A0 specifies that the left margin for
pages in section 1 is 1440 twips (1 inch) wide.

**grpprl.prl\[4\].sprmSDxaRight:** 0xB022 specifies that this is the
section property sprmSDxaRight and that the operand is two bytes.

**grpprl.prl\[4\].operand:** 0x05A0 specifies that the right margin for
pages in section 1 is 1440 twips (1 inch) wide.

**grpprl.prl\[5\].sprmSDyaTop:** 0x9023 specifies that this is the
section property sprmSDyaTop and that the operand is two bytes.

**grpprl.prl\[5\].operand:** 0x05A0 specifies that the top margin for
pages in section 1 is 1440 twips (1 inch) high.

**grpprl.prl\[6\].sprmSDyaBottom:** 0x9024 specifies that this is the
section property sprmSDyaBottom and that the operand is two bytes.

**grpprl.prl\[6\].operand:** 0x05A0 specifies that the bottom margin for
pages in section 1 is 1440 twips (1 inch) high.

**grpprl.prl\[7\].sprmSDzaGutter:** 0xB025 specifies that this is the
section property sprmSDzaGutter and that the operand is two bytes.

**grpprl.prl\[7\].operand:** 0x0000 specifies that the [**gutter
margin**](#gt_384fedff-6be0-4cc3-9361-0430ba5ec2dd) for pages in section
1 is 0 twips (0 inches) wide.

**grpprl.prl\[8\].sprmSDyaHdrTop:** 0xB017 specifies that this is the
section property sprmSDyaHdrTop and that the operand is two bytes.

**grpprl.prl\[8\].operand:** 0x02D0 specifies that headers for pages in
section 1 are positioned 720 twips (0.5 inches) from the top edge of the
page.

**grpprl.prl\[9\].sprmSDyaHdrBottom:** 0xB018 specifies that this is the
section property sprmSDyaHdrBottom and that the operand is two bytes.

**grpprl.prl\[9\].operand:** 0x02D0 specifies that footers for pages in
section 1 are positioned 720 twips (0.5 inches) from the bottom edge of
the page.

**grpprl.prl\[10\].sprmSDxaColumns:** 0x900C specifies that this is the
section property sprmSDxaColumns and that the operand is two bytes.

**grpprl.prl\[10\].operand:** 0x02D0 specifies that the spacing between
columns, if there are multiple columns in section 1, is 720 twips (0.5
inches) wide.

**Sed\[0\].fcSpex** contains only some of the properties that apply to
the **Sepx** structure. Properties that are not contained in
**sed\[0\].fcSpex** take on their respective default values.
