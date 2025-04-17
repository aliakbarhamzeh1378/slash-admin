"""add sdk wizard data table

Revision ID: 3c4c3e11b4b8
Revises: 85bd0cd40c7b
Create Date: 2025-04-18 00:21:02.568074

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy import text


# revision identifiers, used by Alembic.
revision: str = '3c4c3e11b4b8'
down_revision: Union[str, None] = '85bd0cd40c7b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create sdk_wizard_data table
    op.create_table(
        'sdk_wizard_data',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('platform', sa.String(), nullable=False),
        sa.Column('store_url', sa.String(), nullable=False),
        sa.Column('database_access', sa.String(), nullable=False),
        sa.Column('field_mappings', sa.JSON(), nullable=True),
        sa.Column('woo_commerce_secret_key', sa.String(), nullable=True),
        sa.Column('woo_commerce_client_key', sa.String(), nullable=True),
        sa.Column('is_data_extracted', sa.Boolean(), default=False),
        sa.Column('fields', sa.JSON(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_sdk_wizard_data_id', 'sdk_wizard_data', ['id'], unique=False)
    op.create_index('ix_sdk_wizard_data_user_id', 'sdk_wizard_data', ['user_id'], unique=False)

    # Update has_submitted_website column to be non-nullable
    # For SQLite, we need to recreate the table
    with op.batch_alter_table('users') as batch_op:
        batch_op.alter_column('has_submitted_website',
                            existing_type=sa.Boolean(),
                            nullable=False)


def downgrade() -> None:
    # Drop sdk_wizard_data table and its indexes
    op.drop_index('ix_sdk_wizard_data_user_id', table_name='sdk_wizard_data')
    op.drop_index('ix_sdk_wizard_data_id', table_name='sdk_wizard_data')
    op.drop_table('sdk_wizard_data')

    # Make has_submitted_website nullable again
    with op.batch_alter_table('users') as batch_op:
        batch_op.alter_column('has_submitted_website',
                            existing_type=sa.Boolean(),
                            nullable=True)
