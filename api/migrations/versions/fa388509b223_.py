"""empty message

Revision ID: fa388509b223
Revises: e7cbc1ffbfcb
Create Date: 2020-11-11 11:25:10.199557

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa388509b223'
down_revision = 'e7cbc1ffbfcb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('dislikes_raitng_id_fkey', 'dislikes', type_='foreignkey')
    op.drop_constraint('dislikes_disliked_by_fkey', 'dislikes', type_='foreignkey')
    op.create_foreign_key(None, 'dislikes', 'ratings', ['raitng_id'], ['rating_id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'dislikes', 'users', ['disliked_by'], ['username'], ondelete='CASCADE')
    op.drop_constraint('likes_raitng_id_fkey', 'likes', type_='foreignkey')
    op.drop_constraint('likes_liked_by_fkey', 'likes', type_='foreignkey')
    op.create_foreign_key(None, 'likes', 'users', ['liked_by'], ['username'], ondelete='CASCADE')
    op.create_foreign_key(None, 'likes', 'ratings', ['raitng_id'], ['rating_id'], ondelete='CASCADE')
    op.drop_constraint('lists_course_id_fkey', 'lists', type_='foreignkey')
    op.drop_constraint('lists_user_id_fkey', 'lists', type_='foreignkey')
    op.create_foreign_key(None, 'lists', 'users', ['user_id'], ['username'], ondelete='CASCADE')
    op.create_foreign_key(None, 'lists', 'courses', ['course_id'], ['course_id'], ondelete='CASCADE')
    op.drop_constraint('notifications_course_id_fkey', 'notifications', type_='foreignkey')
    op.drop_constraint('notifications_user_id_fkey', 'notifications', type_='foreignkey')
    op.create_foreign_key(None, 'notifications', 'courses', ['course_id'], ['course_id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'notifications', 'users', ['user_id'], ['username'], ondelete='CASCADE')
    op.drop_constraint('ratings_user_id_fkey', 'ratings', type_='foreignkey')
    op.drop_constraint('ratings_course_id_fkey', 'ratings', type_='foreignkey')
    op.create_foreign_key(None, 'ratings', 'users', ['user_id'], ['username'], ondelete='CASCADE')
    op.create_foreign_key(None, 'ratings', 'courses', ['course_id'], ['course_id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'ratings', type_='foreignkey')
    op.drop_constraint(None, 'ratings', type_='foreignkey')
    op.create_foreign_key('ratings_course_id_fkey', 'ratings', 'courses', ['course_id'], ['course_id'])
    op.create_foreign_key('ratings_user_id_fkey', 'ratings', 'users', ['user_id'], ['username'])
    op.drop_constraint(None, 'notifications', type_='foreignkey')
    op.drop_constraint(None, 'notifications', type_='foreignkey')
    op.create_foreign_key('notifications_user_id_fkey', 'notifications', 'users', ['user_id'], ['username'])
    op.create_foreign_key('notifications_course_id_fkey', 'notifications', 'courses', ['course_id'], ['course_id'])
    op.drop_constraint(None, 'lists', type_='foreignkey')
    op.drop_constraint(None, 'lists', type_='foreignkey')
    op.create_foreign_key('lists_user_id_fkey', 'lists', 'users', ['user_id'], ['username'])
    op.create_foreign_key('lists_course_id_fkey', 'lists', 'courses', ['course_id'], ['course_id'])
    op.drop_constraint(None, 'likes', type_='foreignkey')
    op.drop_constraint(None, 'likes', type_='foreignkey')
    op.create_foreign_key('likes_liked_by_fkey', 'likes', 'users', ['liked_by'], ['username'])
    op.create_foreign_key('likes_raitng_id_fkey', 'likes', 'ratings', ['raitng_id'], ['rating_id'])
    op.drop_constraint(None, 'dislikes', type_='foreignkey')
    op.drop_constraint(None, 'dislikes', type_='foreignkey')
    op.create_foreign_key('dislikes_disliked_by_fkey', 'dislikes', 'users', ['disliked_by'], ['username'])
    op.create_foreign_key('dislikes_raitng_id_fkey', 'dislikes', 'ratings', ['raitng_id'], ['rating_id'])
    # ### end Alembic commands ###