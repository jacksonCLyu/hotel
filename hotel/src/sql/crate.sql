CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '年龄',
  `user_account` varchar(255) NOT NULL COMMENT '用户账号',
  `user_password` varchar(255) NOT NULL COMMENT '用户密码',
  `user_id` int(20) NOT NULL COMMENT '身份证号',
  `user_name` varchar(255) NOT NULL COMMENT '用户名字',
  `user_age` int(11) DEFAULT NULL,
  `crate_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;