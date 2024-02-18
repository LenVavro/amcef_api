-- AddForeignKey
ALTER TABLE `user_list` ADD CONSTRAINT `user_list_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_list` ADD CONSTRAINT `user_list_list_id_fkey` FOREIGN KEY (`list_id`) REFERENCES `list`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
