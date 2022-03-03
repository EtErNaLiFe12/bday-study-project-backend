/*
  Warnings:

  - Added the required column `mng_no` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `mng_no` VARCHAR(30) NOT NULL,
    MODIFY `mod_dt` DATETIME(3) NOT NULL;
