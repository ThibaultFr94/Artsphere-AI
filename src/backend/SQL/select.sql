SELECT user.email, GROUP_CONCAT(type.name) AS type_list
FROM artsphereai.user
JOIN artsphereai.type
JOIN artsphereai.user_type
ON user_type.user_id = user.id
AND user_type.type_id = type.id
GROUP BY user.id;

