-- AlterTable
ALTER TABLE `Post` MODIFY `crt_dt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `mod_dt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` MODIFY `reg_dt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
