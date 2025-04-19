"""create billing tables

Revision ID: create_billing_tables
Revises: 213f5b9aec0a
Create Date: 2024-04-10 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'create_billing_tables'
down_revision = '213f5b9aec0a'
branch_labels = None
depends_on = None


def upgrade():
    # Create billing_plans table
    op.create_table(
        'billing_plans',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('features', sa.Text(), nullable=False),  # Store JSON as text in SQLite
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(datetime(\'now\'))'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_billing_plans_id'), 'billing_plans', ['id'], unique=False)

    # Create user_subscriptions table
    op.create_table(
        'user_subscriptions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('plan_id', sa.Integer(), nullable=False),
        sa.Column('status', sa.String(), nullable=False, server_default='active'),
        sa.Column('start_date', sa.DateTime(timezone=True), nullable=False),
        sa.Column('end_date', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(datetime(\'now\'))'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['plan_id'], ['billing_plans.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_subscriptions_id'), 'user_subscriptions', ['id'], unique=False)

    # Create billing_history table
    op.create_table(
        'billing_history',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('plan_id', sa.Integer(), nullable=False),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('status', sa.String(), nullable=False),
        sa.Column('payment_date', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(datetime(\'now\'))'), nullable=False),
        sa.ForeignKeyConstraint(['plan_id'], ['billing_plans.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_billing_history_id'), 'billing_history', ['id'], unique=False)

    # Create usage_stats table
    op.create_table(
        'usage_stats',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('api_calls_used', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('api_calls_limit', sa.Integer(), nullable=False),
        sa.Column('storage_used', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('storage_limit', sa.Integer(), nullable=False),
        sa.Column('team_members_used', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('team_members_limit', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(datetime(\'now\'))'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_usage_stats_id'), 'usage_stats', ['id'], unique=False)


def downgrade():
    op.drop_index(op.f('ix_usage_stats_id'), table_name='usage_stats')
    op.drop_table('usage_stats')
    op.drop_index(op.f('ix_billing_history_id'), table_name='billing_history')
    op.drop_table('billing_history')
    op.drop_index(op.f('ix_user_subscriptions_id'), table_name='user_subscriptions')
    op.drop_table('user_subscriptions')
    op.drop_index(op.f('ix_billing_plans_id'), table_name='billing_plans')
    op.drop_table('billing_plans') 