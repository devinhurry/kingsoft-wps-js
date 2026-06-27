# Introduction

## Overview

### Characters

The fundamental unit of a Word binary file is a character. This includes
visual characters such as letters, numbers, and punctuation. It also
includes formatting characters such as [**paragraph
marks**](#gt_561de4b6-b1fb-438b-9eb7-57ce57eabab3), [**end of cell
marks**](#gt_2dfdaa55-39fd-4dc0-a630-dae1c4c09c9b), line breaks, or
[**section breaks**](#gt_b913633e-3b9f-4e4a-8730-f2e4bdb2be68). Finally,
it includes [**anchor**](#gt_084d6638-17a5-4bf5-8bf1-70881bdeb997)
characters such as footnote reference characters, picture anchors, and
comment anchors.

Characters are indexed by their zero-based **Character Position**, or
**CP** (section [2.2.1](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)).
This documentation is generally concerned with **CPs** (section 2.2.1),
not with the underlying text. Section
[2.4.1](#Section_01d5d8c4cf9c4ef980fd439e763cfe01) specifies an
algorithm for determining the text at a particular **CP** (section
2.2.1), but this is just one of many pieces of information an
application might look for. The reader needs to understand that this
documentation is much more about logical characters in a document than
about physical bytes in a file.

### PLCs

Many features of the Word Binary File Format pertain to a range of
**CPs** (section [2.2.1](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)).
For example, a [**bookmark**](#gt_42f9c2f4-8a4b-4d64-a0e1-fc071debdf4c)
is a range of **CPs** (section 2.2.1) that is named by the document
author. As another example, a field is made up of three control
characters with ranges of arbitrary document content between them.

The Word Binary File Format uses a **PLC** structure (section
[2.2.2](#Section_a649fcc578684245be1204eea89d916b)) to specify these and
other kinds of ranges of **CPs** (section 2.2.1). A **PLC** (section
2.2.2) is simply a mapping from **CPs** (section 2.2.1) to other,
arbitrary data.

### Formatting

The formatting of characters, paragraphs, sections, tables, and pictures
is specified as a set of differences in formatting from the default
formatting for these objects. Modifications to individual properties are
expressed using a [Prl](#prl). A Prl is a Single Property Modifier, or
[Sprm](#sprm), and an operand that specifies the new value for the
property. Each property has (at least) one unique Sprm that modifies it.
For example, [sprmCFBold](#character-properties) modifies the bold
formatting of text, and [sprmPDxaLeft](#paragraph-properties) modifies
the [**logical left**](#gt_ccc2ab6c-db9b-4c67-9b95-21ce79e7358d) indent
of a paragraph.

The final set of properties for text, paragraphs, and tables comes from
a hierarchy of styles and from Prl elements applied directly (for
example, by the user selecting some text and clicking the Bold button in
the user interface). Styles allow complex sets of properties to be
specified in a compact way. They also allow the user to change the
appearance of a document without visiting every place in the document
where a change is necessary. The style sheet for a document is specified
by a [STSH](#stsh), as defined in section 2.9.271.

See section [2.4.6.6](#Section_d8b661231a3d4e0694c55ab16e9b6417) for the
algorithm that determines the complete set of formatting for a
character, paragraph, table, or picture.

See section [2.8.26](#plcfsed) for the structure used to determine the
boundaries of sections and the location of their properties.

See section [2.6](#Section_4fae38be499347d2b82c8f32e4ab9ff0) for the
complete list of Sprms.

### Tables

A table consists of a set of paragraphs that has a particular set of
properties applied. There are special characters that denote the ends of
table [**cells**](#gt_43d1e51e-4f26-493b-b7c9-e84e920d7461) and the ends
of table rows, but there are no characters to denote the beginning of a
table cell or the end of the table as a whole. Tables can be nested
inside other tables.

Section [2.4.3](#Section_5b45f0e777604fdbaf880146de2feb4c) provides an
overview of tables, and Sections
[2.4.4](#Section_e32f7b2f47594e8f9ef9e0cdfd11a335) and
[2.4.5](#Section_8eebe8176c3b490d869530c799cc2367) specify algorithms
for determining the boundaries of a table cell and table row,
respectively.

### Pictures

Pictures in the Word Binary File format can be either inline or
floating. An inline picture is represented by a character whose
[**Unicode**](#gt_c305d0ab-8b94-461a-bd76-13b40cb8c4d8) value is 0x0001
and has [sprmCFSpec](#character-properties) applied with a value of 1
and sprmCPicLocation applied to specify the location of the picture
data. A floating picture is represented by an
[**anchor**](#gt_084d6638-17a5-4bf5-8bf1-70881bdeb997) character with a
Unicode value of 0x0008 with sprmCFSpec applied with a value of 1. In
addition, floating pictures are referenced by a [PlcfSpa](#plcfspa)
structure which contains additional data about the picture. A floating
picture can appear anywhere on the same page as its anchor. The document
author can choose to have the floating picture rearrange the text in
various ways or to leave the text as is.

### The FIB

The [main stream](#Section_d7fae142670d4cd5869a708366984a71) of the Word
Binary File Format begins with a File Information Block, or [FIB](#fib).
The FIB specifies the locations of all other data in the file. The
locations are specified by a pair of integers, the first of which
specifies the location and the second of which specifies the size. These
integers appear in substructures of the FIB such as the
[FibRgFcLcb97](#fibrgfclcb97). The location names are prefixed with
**fc**; the size names are prefixed with **lcb**.

### Byte Ordering

Some computer architectures number bytes in a binary word from left to
right, which is referred to as
[**big-endian**](#gt_6f6f9e8e-5966-4727-8527-7e02fb864e7e). The bit
diagram for this documentation is big-endian. Other architectures number
the bytes in a binary word from right to left, which is referred to as
[**little-endian**](#gt_079478cb-f4c5-4ce5-b72b-2144da5d2ce7). The
underlying file format enumerations, objects, and records are
little-endian.

Using big-endian and little-endian methods, the number 0x12345678 would
be stored as shown in the following table.

| **Byte order** | **Byte 0** | **Byte 1** | **Byte 2** | **Byte 3** |
|----------------|------------|------------|------------|------------|
| Big-endian     | 0x12       | 0x34       | 0x56       | 0x78       |
| Little-endian  | 0x78       | 0x56       | 0x34       | 0x12       |

Unless otherwise specified, all data in the Word Binary File Format is
stored in little-endian format.

### General Organization of This Documentation

Section 2 of this documentation is arranged with high-level overviews
followed by detailed specifications.

Sections 2.1 through [2.4](#Section_33128d30fb75426abddfeb2f6d9898bf)
provide general specifications of structures and concepts that recur in
this documentation. Read these sections from beginning to end before
delving deeper into section 2. The most important part of this
documentation is section 2.4, which specifies algorithms for retrieving
document content and determining its properties.

Section [2.5](#Section_2edea690135f4c73a9aeb296ab70ce51) provides a
complete specification of the [FIB](#fib), including links to all
referenced data structures.

Section [2.6](#Section_4fae38be499347d2b82c8f32e4ab9ff0) provides a
complete list of [Sprm](#sprm) elements and their operands; it can be
considered a complete list of the character, paragraph, table, and
section properties supported by the Word Binary File Format. Note that
most picture properties are not represented by Sprm elements.
[\[MS-ODRAW\]](%5bMS-ODRAW%5d.pdf#Section_8560795e77594745838ff7f2ef2f1872)
specifies most picture properties. Each Sprm definition specifies the
default value for the property that it modifies.

Section [2.7](#Section_d145fe23ffea41609978d207f4388fcf) provides a
specification of document-level properties

Section [2.8](#Section_89dbd63eb561465ab07b9e3c7eedee77) provides a
complete specification of all
[PLC](#Section_a649fcc578684245be1204eea89d916b) types. Finally, section
[2.9](#Section_9b74ba8aba604bdfaf2119c262ea431a) provides specifications
for data types referenced by previous sections. Sections 2.8 and 2.9 are
intended to be read as the destination of links from other sections;
they are not intended to be read straight through.

Section 3 provides examples that relate to the algorithms in section 2.4
and examples of bookmarks (1) and sections. These examples are intended
to illustrate the concept of property storage, PLCs, and numbering, and
to demonstrate the mapping between **CP** (section
[2.2.1](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)) and underlying text
(as specified in section
[2.4.1](#Section_01d5d8c4cf9c4ef980fd439e763cfe01)).

Section 4 discusses encryption, obfuscation, and other security issues
relating to the Word Binary File Format.

Section 5 is a list of version-specific behaviors. It is intended to be
read in the context of specifications in section 2, not as a stand-alone
section. Specifications in section 2 provide links to the relevant items
in section 5.
